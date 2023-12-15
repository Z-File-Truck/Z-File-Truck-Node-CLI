import fs from 'fs/promises';
import path from 'path';

export async function createParentDir(filePath) {
    try {
        await fs.mkdir(path.dirname(filePath), { recursive: true });
        // Additional logic after successfully creating the directory
    } catch (err) {
        console.error(`Error in create parent directory function: ${err} while creating ${path.dirname(filePath)}`);
        throw err; // Rethrow the error for further handling if necessary
    }
}



export default { createParentDir };