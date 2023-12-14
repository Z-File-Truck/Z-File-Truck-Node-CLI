import fs from 'fs';
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
        throw new Error('File types must start with a dot "."');
    }
}

export default { validatePaths, validateFileTypes };