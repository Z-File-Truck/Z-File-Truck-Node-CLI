import CONSTANTS from '../constants.js';
import { copyFiles, validatePaths, validateFileTypes } from '../utils/index.js';

export async function handleCopyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes, CONSTANTS.quickFileTypes);
        await copyFiles(sourcePath, destinationPath, fileTypes, recursive, postDelete, preservePath);
    } catch (error) {
        console.error(error.message);
    }
}

export default handleCopyFiles;
