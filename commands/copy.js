const CONSTANTS = require('../constants.js');
const { copyFiles, validatePaths, validateFileTypes } = require('../utils');

async function handleCopyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes);
        await copyFiles(sourcePath, destinationPath, fileTypes, recursive, postDelete, preservePath, fileCntLimit, fileSizeLimit);
        // process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

module.exports = handleCopyFiles;
