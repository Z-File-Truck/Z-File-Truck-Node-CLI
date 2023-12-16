import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
import CONSTANTS from '../constants.js';
import { timeoutPromise } from './helpers.js';

// old recursive function
// export function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, fileTypes, recursive, preservePath, FileFoundCallback) {
//     const files = fs.readdirSync(currentPath);

//     files.forEach(file => {
//         const curSrcFileFullPath = path.join(currentPath, file);
//         const stat = fs.statSync(curSrcFileFullPath);

//         if (stat.isDirectory() && recursive) {
//             const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
//             traverseDirectory(sourcePath, curSrcFileFullPath, destinationPath, newDestination, filesList, fileTypes, recursive, preservePath);
//         } else if (stat.isFile() && (fileTypes.includes(path.extname(file)) || fileTypes.includes('*'))) {
//             const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
//             const destFilePath = path.join(destinationPath, relativePath);
            
//             filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath });
//             if(FileFoundCallback)
//                 FileFoundCallback(filesList);
//         }
//     });
// }

export async function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, fileTypes, recursive, preservePath, FileFoundCallback, FailCallback, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    const stack = [currentPath];

    while (stack.length > 0) {
        if (filesList.length >= fileLimit) 
            break; // Stop if the maximum number of files has been reached
        
        const currentDir = stack.pop();
        try {
            // Race the timeout against the readdir operation
            const files = await Promise.race([fs.readdir(currentDir), timeoutPromise(5000, 'Read directory operation timeout')]);

            for (const file of files) {
                if (filesList.length >= fileLimit) 
                    break; // Stop if the maximum number of files has been reached
                const curSrcFileFullPath = path.join(currentDir, file);
                try {
                    const stat = await Promise.race([fs.stat(curSrcFileFullPath), timeoutPromise(200, 'Stat operation timeout')]);

                    if (stat.isDirectory() && recursive) {
                        const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
                        stack.push(curSrcFileFullPath);
                    } else if (stat.isFile() && (fileTypes.includes(path.extname(file)) || fileTypes.includes('*'))) {
                        const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
                        const destFilePath = path.join(destinationPath, relativePath);

                        filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath, details: stat });
                        await FileFoundCallback(filesList.length);
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

export async function collectFiles(sourcePath, destinationPath = '', fileTypes, recursive, preservePath, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    let filesList = [];
    const spinner = ora('Reading Files...').start();

    await traverseDirectory(
        sourcePath, sourcePath, destinationPath, destinationPath, filesList, fileTypes, recursive, preservePath, 
        async (count) => {
            spinner.text = `Reading Files... ${count} files found`;
        }, 
        async (message) => {
            spinner.fail(message);
            spinner.start();
        },
        fileLimit
    );

    spinner.succeed(`Reading Files Done... ${filesList.length} files found`);
    spinner.stop();
    return filesList;
}

export default { collectFiles, traverseDirectory };