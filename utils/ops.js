
import CONSTANTS from '../constants.js';
import { collectFiles } from './common.js';
import { handleCopyOperation, handleCutOperation } from './handlers.js';
import ora from 'ora';
import { calculateFilesSizeInMB, calculatePercentage } from './helpers.js';
const spinner = ora();

export async function copyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    const filesToCopy = await collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileCntLimit, fileSizeLimit);
    const totalFilesCnt = filesToCopy.length;
    const totalFilesSize = calculateFilesSizeInMB(filesToCopy);
    let successFilesCnt = 0;
    let successFiles = [];
    let errorFilesCnt = 0;
    let errorFiles = [];
    spinner.start('Copying files...');
    // Regularly update the spinner
    const interval = setInterval(() => {
        spinner.text = `Copying files...${successFilesCnt + errorFilesCnt}/${totalFilesCnt} ${calculatePercentage(successFilesCnt + errorFilesCnt, totalFilesCnt)}%. remaining: ${totalFilesSize - calculateFilesSizeInMB(successFiles) - calculateFilesSizeInMB(errorFiles)} MB`;
    }, 500);

    // Process files in chunks to control concurrency
    const concurrencyLimit = CONSTANTS.DEFAULT_CONCURRENCY_LIMIT;
    for (let i = 0; i < filesToCopy.length; i += concurrencyLimit) {
        const chunk = filesToCopy.slice(i, i + concurrencyLimit);
        const promises = chunk.map(file => handleCopyOperation(file, postDelete, (data) => {
            if(data.success){
                successFilesCnt++;
            }else {
                spinner.fail(`Error in copying file: ${file.srcFilePath} ::: ${error}`);
                spinner.start();
            }
        }));
        await Promise.allSettled(promises);
    }

    clearInterval(interval); // Clear the interval once all files are processed

    spinner.succeed(`Copy operation completed. totalFiles: ${totalFilesCnt}, ${successFilesCnt} success, ${errorFilesCnt} fail.`);
    spinner.stop();
}

export async function cutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT, postDelete = false) {
    const filesToCut = await collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileCntLimit, fileSizeLimit);
    const totalFilesCnt = filesToCut.length;
    let successFilesCnt = 0;
    spinner.start('Cuting files...');
    // Regularly update the spinner
    const interval = setInterval(() => {
        spinner.text = `Cuting files... ${((successFilesCnt / totalFilesCnt) * 100).toFixed(2)}%.`;
    }, 1000);

    // Process files in chunks to control concurrency
    const concurrencyLimit = CONSTANTS.DEFAULT_CONCURRENCY_LIMIT;
    for (let i = 0; i < filesToCut.length; i += concurrencyLimit) {
        const chunk = filesToCut.slice(i, i + concurrencyLimit);
        const promises = chunk.map(file => handleCutOperation(file, postDelete, (data) => {
            if(data.success){
                successFilesCnt++;
            }else {
                spinner.fail(`Error in cutting file: ${file.srcFilePath} ::: ${error}`);
                spinner.start();
            }
        }));
        await Promise.allSettled(promises);
    }

    clearInterval(interval); // Clear the interval once all files are processed

    spinner.succeed(`Cut operation completed. ${successFilesCnt}/${totalFilesCnt} files cut.`);
    spinner.stop();
}

export default { copyFiles, cutFiles };