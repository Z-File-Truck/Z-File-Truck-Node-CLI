import fs from 'fs';

export function cutFile(src, dest) {
    fs.renameSync(src, dest);
}

export function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
}

export function deleteFile(src) {
    fs.unlinkSync(src);
}

export default { cutFile, copyFile, deleteFile }