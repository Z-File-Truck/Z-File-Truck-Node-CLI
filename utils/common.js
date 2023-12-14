import fs from 'fs';
import path from 'path';

export function collectFiles(sourcePath, destinationPath = '', fileTypes, recursive, preservePath) {
    let filesList = [];

    function traverseDirectory(currentPath, currentDestination) {
        const files = fs.readdirSync(currentPath);

        files.forEach(file => {
            const fullPath = path.join(currentPath, file);
            const stat = fs.statSync(fullPath);

            if (stat.isDirectory() && recursive) {
                const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
                traverseDirectory(fullPath, newDestination);
            } else if (stat.isFile() && fileTypes.includes(path.extname(file))) {
                const relativePath = preservePath ? path.relative(sourcePath, fullPath) : path.basename(fullPath);
                const destFilePath = path.join(destinationPath, relativePath);
                filesList.push({ srcFilePath: fullPath, destFilePath: destFilePath });
            }
        });
    }

    traverseDirectory(sourcePath, destinationPath);
    return filesList;
}

export default { collectFiles };