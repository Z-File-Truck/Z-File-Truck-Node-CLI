import CONSTANTS from '../constants.js';
import { cutFiles, validateFileTypes, validatePaths } from '../utils/index.js';

export function handleCutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes, CONSTANTS.quickFileTypes);
        cutFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath);
    } catch (error) {
        console.error(error);
    }
}


export default handleCutFiles;
