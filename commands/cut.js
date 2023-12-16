import CONSTANTS from '../constants.js';
import { cutFiles, validateFileTypes, validatePaths } from '../utils/index.js';

export async function handleCutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false, fileLimit = CONSTANTS.DEFAULT_FILE_LIMIT) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes, CONSTANTS.quickFileTypes);
        await cutFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileLimit);
        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


export default handleCutFiles;
