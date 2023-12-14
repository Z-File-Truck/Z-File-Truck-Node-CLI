import { cutFiles, validateFileTypes, validatePaths } from '../utils/index.js';

export function handleCutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false) {
    try {
        validatePaths(sourcePath, destinationPath);
        validateFileTypes(fileTypes);
        cutFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath);
    } catch (error) {
        console.error(error);
    }
}


export default handleCutFiles;
