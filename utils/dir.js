const { traverseDirectory } = require("./common");
const { copyFile, cutFile } = require("./file");

function copyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false) {
    traverseDirectory(sourcePath, destinationPath, fileTypes, recursive, {action: { actionFunc: copyFile, actionOptions: {postDelete} }, preservePath});
}

function cutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false) {
    traverseDirectory(sourcePath, destinationPath, fileTypes, recursive, {action: { actionFunc: cutFile }, preservePath});
}


module.exports ={ copyFiles, cutFiles };