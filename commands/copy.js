import CONSTANTS from '../constants.js';
import { copyFiles, validatePaths, validateFileTypes } from '../utils/index.js';

export async function handleCopyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes);
        await copyFiles(sourcePath, destinationPath, fileTypes, recursive, postDelete, preservePath, fileCntLimit, fileSizeLimit);
        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}

export default handleCopyFiles;
