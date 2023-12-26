const fs = require('fs').promises;

async function cutFile(src, dest) {
    try {
        await fs.rename(src, dest);
    } catch (err) {
        console.error(`Error in cut file function: ${err} while moving ${src} to ${dest}`);
        throw err; // Re-throw the error for further handling, if necessary
    }
}

async function copyFile(src, dest) {
    try {
        await fs.copyFile(src, dest);
    } catch (err) {
        console.error(`Error in copy file function: ${err} while copying ${src} to ${dest}`);
        throw err;
    }
}

async function deleteFile(src) {
    try {
        await fs.unlink(src);
    } catch (err) {
        console.error(`Error in delete file function: ${err} while deleting ${src}`);
        throw err;
    }
}

async function fileExists(filePath) {
    try {
        await fs.access(filePath, fs.constants.F_OK);
        return true;
    } catch (err) {
        // The file doesn't exist or there was an error accessing it
        return false;
    }
}

module.exports = { cutFile, copyFile, deleteFile, fileExists }