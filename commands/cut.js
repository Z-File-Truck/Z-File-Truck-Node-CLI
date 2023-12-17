import CONSTANTS from '../constants.js';
import { cutFiles, validateFileTypes, validatePaths } from '../utils/index.js';

export async function handleCutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false, fileCntLimit = CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, fileSizeLimit = CONSTANTS.DEFAULT_MB_SIZE_LIMIT) {
    try {
        validatePaths(sourcePath, destinationPath);
        fileTypes = validateFileTypes(fileTypes);
        await cutFiles(sourcePath, destinationPath, fileTypes, recursive, preservePath, fileCntLimit, fileSizeLimit);
        process.exit(0);
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
}


export default handleCutFiles;
