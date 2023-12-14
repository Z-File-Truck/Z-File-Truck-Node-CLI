import { copyFile, deleteFile, cutFile } from './file.js';
import { collectFiles } from './common.js';
import { createParentDir } from './dir.js';
import ora from 'ora';

export function copyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false) {
    const filesToCopy = collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath);
    const totalFiles = filesToCopy.length;
    let doneFiles = 0;

    const spinner = ora(`Copying files... 0%`).start();

    filesToCopy.forEach(({ srcFilePath, destFilePath }) => {
        // Ensure the destination directory exists
        
        createParentDir(destFilePath);
        copyFile(srcFilePath, destFilePath);
        if (postDelete) {
            deleteFile(srcFilePath);
        }

        doneFiles++;
        spinner.text = `Copying files... ${((doneFiles / totalFiles) * 100).toFixed(2)}%`;
    });

    spinner.stop();
    console.log(`Copy operation completed. ${doneFiles}/${totalFiles} files copied.`);
}

export function cutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false) {
    const filesToCut = collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath);
    const totalFiles = filesToCut.length;
    let doneFiles = 0;

    const spinner = ora(`Cutting files... 0%`).start();

    filesToCut.forEach(({ srcFilePath, destFilePath }) => {
        // Ensure the destination directory exists
        
        createParentDir(destFilePath);
        cutFile(srcFilePath, destFilePath);

        doneFiles++;
        spinner.text = `Cutting files... ${doneFiles}/${totalFiles} ${((doneFiles / totalFiles) * 100).toFixed(2)}%`;
    });

    spinner.stop();
    console.log(`Cut operation completed. ${doneFiles}/${totalFiles} files cut.`);
}

export default { copyFiles, cutFiles };