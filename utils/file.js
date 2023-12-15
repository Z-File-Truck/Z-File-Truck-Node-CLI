import fs from 'fs/promises';

export async function cutFile(src, dest) {
    try {
        await fs.rename(src, dest);
    } catch (err) {
        console.error(`Error in cut file function: ${err} while moving ${src} to ${dest}`);
        throw err; // Re-throw the error for further handling, if necessary
    }
}

export async function copyFile(src, dest) {
    try {
        await fs.copyFile(src, dest);
    } catch (err) {
        console.error(`Error in copy file function: ${err} while copying ${src} to ${dest}`);
        throw err;
    }
}

export async function deleteFile(src) {
    try {
        await fs.unlink(src);
    } catch (err) {
        console.error(`Error in delete file function: ${err} while deleting ${src}`);
        throw err;
    }
}

export default { cutFile, copyFile, deleteFile }