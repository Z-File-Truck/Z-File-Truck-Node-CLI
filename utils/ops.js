
import CONSTANTS from '../constants.js';
import { collectFiles } from './common.js';
import { handleCopyOpWithTimeOut, handleCutOpWithTimeOut } from './handlers.js';
import ora from 'ora';
const spinner = ora();

export async function copyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    const filesToCopy = await collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileLimit);
    const totalFiles = filesToCopy.length;
    let doneFiles = 0;
    spinner.start('Copying files...');
    // Regularly update the spinner
    const interval = setInterval(() => {
        spinner.text = `Copying files... ${((doneFiles / totalFiles) * 100).toFixed(2)}%.`;
    }, 500);

    // Process files in chunks to control concurrency
    const concurrencyLimit = CONSTANTS.DEFAULT_CONCURRENCY_LIMIT;
    for (let i = 0; i < filesToCopy.length; i += concurrencyLimit) {
        const chunk = filesToCopy.slice(i, i + concurrencyLimit);
        const promises = chunk.map(file => handleCopyOpWithTimeOut(file, postDelete, (err) => {
            spinner.fail(`Error in copying file: ${file.srcFilePath} ::: ${err}`);
            spinner.start();
        }).then(() =>  doneFiles++).catch((err) => console.log('Error in chuck promise', err)));
        await Promise.allSettled(promises);
    }

    clearInterval(interval); // Clear the interval once all files are processed

    spinner.succeed(`Copy operation completed. ${doneFiles}/${totalFiles} files copied.`);
    spinner.stop();
}

export async function cutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    const filesToCut = await collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileLimit);
    const totalFiles = filesToCut.length;
    let doneFiles = 0;
    spinner.start('Cuting files...');
    // Regularly update the spinner
    const interval = setInterval(() => {
        spinner.text = `Cuting files... ${((doneFiles / totalFiles) * 100).toFixed(2)}%.`;
    }, 1000);

    // Process files in chunks to control concurrency
    const concurrencyLimit = CONSTANTS.DEFAULT_CONCURRENCY_LIMIT;
    for (let i = 0; i < filesToCut.length; i += concurrencyLimit) {
        const chunk = filesToCut.slice(i, i + concurrencyLimit);
        const promises = chunk.map(file => handleCutOpWithTimeOut(file, (err) => {
            spinner.fail(`Error in cutting file: ${file.srcFilePath} ::: ${err}`);
            spinner.start();
        }).then(() =>  doneFiles++).catch((err) => console.log('Error in chuck promise', err)));
        await Promise.allSettled(promises);
    }

    clearInterval(interval); // Clear the interval once all files are processed

    spinner.succeed(`Cut operation completed. ${doneFiles}/${totalFiles} files cut.`);
    spinner.stop();
}

export default { copyFiles, cutFiles };