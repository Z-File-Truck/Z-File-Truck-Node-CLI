const { createParentDir } = require('./dir.js');
const { copyFile, deleteFile, cutFile, fileExists } = require('./file.js');
const { timeoutPromise } = require('./helpers.js');
const CONSTANTS = require('../constants.js');



async function handleCleanUp(file) {
    try {
        let fileExistsInSrc = await fileExists(file.srcFilePath);
        let fileExistsInDest = await fileExists(file.destFilePath);
        // Add appropriate cleanup logic here
        // For example, if the file was partially copied, you might want to delete the partially copied file
        if(!fileExistsInSrc && fileExistsInDest)
            await copyFile(file.destFilePath, file.srcFilePath)
        if (fileExistsInDest)
            await deleteFile(file.destFilePath);
        
    } catch (cleanupErr) {
        // Handle cleanup error (log it, etc.)
        console.error("Cleanup error:", cleanupErr);
    }
}

async function handleCopyOperation(file, postDelete, progressHandler) {
    let successOps = [];
    try {
        await createParentDir(file.destFilePath).then(() => successOps.push('createParentDir'));
        await copyFile(file.srcFilePath, file.destFilePath).then(() => successOps.push('copy'));

        if (postDelete) {
            await deleteFile(file.srcFilePath).then(() => successOps.push('delete'));
        }
        progressHandler({success: true, file: file})
    } catch (err) {
        await handleCleanUp(file, successOps)
        progressHandler({success: false, successOps, error: err, file: file})
    }
}

async function handleCutOperation(file, postDelete, progressHandler) {
    let successOps = [];
    try {
        await createParentDir(file.destFilePath).then(() => successOps.push('createParentDir'));
        await cutFile(file.srcFilePath, file.destFilePath).then(() => successOps.push('cut'));

        progressHandler({success: true, file: file})
    } catch (err) {
        await handleCleanUp(file, successOps)
        progressHandler({success: false, successOps, error: err, file: file})
    }
}

module.exports = { handleCopyOperation, handleCutOperation };