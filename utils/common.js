const fs = require('fs').promises;
const orgfs = require('fs');
const path = require('path');
const CONSTANTS = require('../constants.js');
const { MBToBytes, calculateFilesSizeInMB, timeoutPromise } = require('./helpers.js');
let fileType;//= require('file-type');

async function getFileTypes(filePath) {
    if(!fileType) fileType = await import('file-type');
    let fileInfo =  await fileType.fileTypeFromFile(filePath);
    let fileType1 = fileInfo ? `.${fileInfo.ext}` : '';
    let fileType2 = path.extname(filePath);
    return [fileType1, fileType2].filter(Boolean).map(t => t.toLowerCase());
}

async function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, allowedFileTypes, recursive, preservePath, FileFoundCallback, FailCallback, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    const stack = [currentPath];
    let curTotalSize = filesList.reduce((acc, file) => acc + file.details.size, 0);
    while (stack.length > 0) {
        if (filesList.length >= fileCntLimit || curTotalSize >= MBToBytes(fileSizeLimit))
            break; // Stop if the maximum number of files has been reached or the total size of files limit has been reached
        
        const currentDir = stack.pop();
        try {
            // Race the timeout against the readdir operation
            const files = await Promise.race([fs.readdir(currentDir), timeoutPromise(5000, 'Read directory operation timeout')]);

            for (const file of files) {
                if (filesList.length + 1 >= fileCntLimit) 
                    break; // Stop if the maximum number of files has been reached
                const curSrcFileFullPath = path.join(currentDir, file);
                
                try {
                    const stat = await Promise.race([fs.stat(curSrcFileFullPath), timeoutPromise(200, 'Stat operation timeout')]);
                    if(stat.size + curTotalSize >= MBToBytes(fileSizeLimit))
                        break; // Stop if the total size of files limit has been reached
                    if (stat.isDirectory() && recursive) {
                        const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
                        stack.push(curSrcFileFullPath);
                    } else if (stat.isFile()) {
                        let fileTypes = await getFileTypes(curSrcFileFullPath);
                        if((allowedFileTypes.some(t => fileTypes.includes(t)) || allowedFileTypes.includes('*'))){
                            const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
                            const destFilePath = path.join(destinationPath, relativePath);
                            curTotalSize += stat.size;
                            filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath, details: stat });
                            await FileFoundCallback(filesList.length);
                        }
                    }
                } catch (err) {
                    await FailCallback(`Error processing path: ${curSrcFileFullPath}: ${err}`);
                    continue;
                }
            }
        } catch (err) {
            await FailCallback(`Error reading directory: ${currentDir}: ${err}`);
            continue;
        }
    }
}

async function collectFiles(sourcePath, destinationPath = '', allowedFileTypes, recursive, preservePath, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    let filesList = [];
    const { default: Ora } = await import('ora');
    const spinner = Ora('Reading Files...').start();

    await traverseDirectory(
        sourcePath, sourcePath, destinationPath, destinationPath, filesList, allowedFileTypes, recursive, preservePath, 
        async (count) => {
            spinner.text = `Reading Files... ${count} files found`;
        }, 
        async (message) => {
            spinner.fail(message);
            spinner.start();
        },
        fileCntLimit,
        fileSizeLimit
    );

    spinner.succeed(`Reading Files Done... ${filesList.length} (${calculateFilesSizeInMB(filesList)}) files found`);
    spinner.stop();
    return filesList;
}

module.exports = { collectFiles, traverseDirectory };