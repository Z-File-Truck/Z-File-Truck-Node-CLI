import { copyFile, deleteFile, cutFile } from './file.js';
import { collectFiles } from './common.js';
import { createParentDir } from './dir.js';
import ora from 'ora';
// import { Spinner } from "@topcli/spinner";

export async function copyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false) {
    const filesToCopy = await collectFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath);
    const totalFiles = filesToCopy.length;
    let doneFiles = 0;

    const spinner = ora(`Copying files...`).start();

    for (let { srcFilePath, destFilePath } of filesToCopy) {
        try {
            await createParentDir(destFilePath);
            await copyFile(srcFilePath, destFilePath);
            if (postDelete) {
                await deleteFile(srcFilePath);
            }
        } catch (err) {
            spinner.fail(`Error in processing file: ${srcFilePath}`);
            spinner.start(); // Restart the spinner for continuing with the next file
        }

        doneFiles++;
        await new Promise(resolve => setImmediate(() => {
            spinner.text = `Copying files... ${((doneFiles / totalFiles) * 100).toFixed(2)}% completed.`;
            resolve();
        }));
    }

    spinner.succeed(`Copy operation completed. ${doneFiles}/${totalFiles} files copied.`);
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