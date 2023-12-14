const fs = require('fs');
const path = require('path');

const isPreservePath = (options) => options && options.preservePath;

function traverseDirectory(sourcePath, destinationPath, fileTypes, recursive, options = {}) {
    if (!fs.existsSync(destinationPath)) {
        fs.mkdirSync(destinationPath, { recursive: true });
    }

    const files = fs.readdirSync(sourcePath);
    files.forEach(file => {
        const srcFilePath = path.join(sourcePath, file);
        const stat = fs.statSync(srcFilePath);

        if (stat.isDirectory() && recursive) {
            // If recursive, continue traversing
            const newDestinationPath = isPreservePath(options) ? path.join(destinationPath, file) : destinationPath;
            traverseDirectory(srcFilePath, newDestinationPath, fileTypes, recursive, options);
        } else if (stat.isFile() && fileTypes.includes(path.extname(file)) && options.action) {
            // Construct the destination path based on the preservePath flag
            let actionFunc = options.action.actionFunc;
            let actionOptions = options.action.actionOptions;
            const destFilePath = isPreservePath(options) ? path.join(destinationPath, path.relative(sourcePath, srcFilePath)) : path.join(destinationPath, path.basename(file));
            actionFunc(srcFilePath, destFilePath, actionOptions);
        }
    });
}



module.exports =  { traverseDirectory };