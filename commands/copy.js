import CONSTANTS from '../constants.js';
import { copyFiles, validatePaths, validateFileTypes } from '../utils/index.js';

export async function handleCopyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes, CONSTANTS.quickFileTypes);
        await copyFiles(sourcePath, destinationPath, fileTypes, recursive, postDelete, preservePath, fileLimit);
        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default handleCopyFiles;
