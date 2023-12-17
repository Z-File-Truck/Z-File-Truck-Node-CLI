import fs from 'fs';
import CONSTANTS from '../constants.js';
export function validatePaths(source, destination) {
    if (!fs.existsSync(source)) {
        throw new Error(`The source path "${source}" does not exist.`);
    }

    if (!fs.existsSync(destination)) {
        try {
            fs.mkdirSync(destination, { recursive: true });
        } catch (err) {
            throw new Error(`Unable to create destination path "${destination}": ${err.message}`);
        }
    }
}

export function validateFileTypes(fileTypes) {
    if (fileTypes && !fileTypes.every(type => type.startsWith('.'))) {
        if(fileTypes.length === 1 && Object.keys(CONSTANTS.QUICK_FILE_TYPES).includes(fileTypes[0])){
            return CONSTANTS.QUICK_FILE_TYPES[fileTypes[0]].val;
        }else throw new Error(`File types must start with a dot "." or use one of the quick file types ${Object.keys(CONSTANTS.QUICK_FILE_TYPES).map(type => `"${type}"`).join(', ')}`);
    }
    return fileTypes;
}

export default { validatePaths, validateFileTypes };