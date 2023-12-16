import { createParentDir } from './dir.js';
import { copyFile, deleteFile, cutFile } from './file.js';
import { timeoutPromise } from './helpers.js';
const megabitesPerSecond = 1;

export async function handleCopyOpWithTimeOut(file, postDelete, errHanlder) {
    try {
        let operations = [
            createParentDir(file.destFilePath),
            copyFile(file.srcFilePath, file.destFilePath)
        ];

        if (postDelete) {
            operations.push(deleteFile(file.srcFilePath));
        }

        // Race all operations against a timeout promise
        await Promise.race([
            Promise.all(operations),
            timeoutPromise(file.details.size / (1024 * megabitesPerSecond), `Timeout while processing file: ${file.srcFilePath}`)
        ]);
    } catch (err) {
        errHanlder(err)
    }
}

export async function handleCutOpWithTimeOut(file, errHanlder) {
    try {
        let operations = [
            createParentDir(file.destFilePath),
            cutFile(file.srcFilePath, file.destFilePath)
        ];

        // Race all operations against a timeout promise
        await Promise.race([
            Promise.all(operations),
            timeoutPromise(file.details.size / (1024 * megabitesPerSecond), `Timeout while processing file: ${file.srcFilePath}`)
        ]);
    } catch (err) {
        errHanlder(err);
    }
}

export default { handleCopyOpWithTimeOut, handleCutOpWithTimeOut };