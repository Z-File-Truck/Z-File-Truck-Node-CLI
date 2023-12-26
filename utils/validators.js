const fs = require('fs');
const CONSTANTS = require('../constants.js');

function validatePaths(source, destination) {
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

function validateFileTypes(fileTypes) {
    if(!fileTypes || !fileTypes.length)
        throw new Error('File types must be provided');
    // if (fileTypes && !fileTypes.every(type => type.startsWith('.'))) {
    //     if(fileTypes.length === 1 && Object.keys(CONSTANTS.QUICK_FILE_TYPES).includes(fileTypes[0])){
    //         return CONSTANTS.QUICK_FILE_TYPES[fileTypes[0]].val;
    //     }else throw new Error(`File types must start with a dot "." or use one of the quick file types ${Object.keys(CONSTANTS.QUICK_FILE_TYPES).map(type => `"${type}"`).join(', ')}`);
    // }
    let newFileTypes = [];
    fileTypes.forEach(type => {
        // console.log(type)
        if (type.startsWith('.')) {
            newFileTypes.push(type);
        }else if(Object.keys(CONSTANTS.QUICK_FILE_TYPES).includes(type)){
            newFileTypes.push(...CONSTANTS.QUICK_FILE_TYPES[type].val);
        }else throw new Error(`File types must start with a dot "." or use one of the quick file types ${Object.keys(CONSTANTS.QUICK_FILE_TYPES).map(type => `"${type}"`).join(', ')}`);
    });
    return newFileTypes;
}

module.exports = { validatePaths, validateFileTypes };