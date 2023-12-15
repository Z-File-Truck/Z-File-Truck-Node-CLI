import fs from 'fs';
import path from 'path';
import ora from 'ora';

export function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, fileTypes, recursive, preservePath, FileFoundCallback) {
    const files = fs.readdirSync(currentPath);

    files.forEach(file => {
        const curSrcFileFullPath = path.join(currentPath, file);
        const stat = fs.statSync(curSrcFileFullPath);

        if (stat.isDirectory() && recursive) {
            const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
            traverseDirectory(sourcePath, curSrcFileFullPath, destinationPath, newDestination, filesList, fileTypes, recursive, preservePath);
        } else if (stat.isFile() && (fileTypes.includes(path.extname(file)) || fileTypes.includes('*'))) {
            const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
            const destFilePath = path.join(destinationPath, relativePath);
            
            filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath });
            if(FileFoundCallback)
                FileFoundCallback(filesList);
        }
    });
}

export function collectFiles(sourcePath, destinationPath = '', fileTypes, recursive, preservePath) {
    let filesList = [];
    const spinner = ora(`Reading Files...`).start();
    traverseDirectory(sourcePath, sourcePath, destinationPath, destinationPath, filesList, fileTypes, recursive, preservePath, (curList) => {
        spinner.text = `Reading Files... ${curList.length} files found`;
    });
    spinner.stop();
    console.log(`Reading Files Done... ${filesList.length} files found`);
    return filesList;
}

export default { collectFiles, traverseDirectory };