const { copyFiles } = require('../utils');

function handleCopyFiles(sourcePath, destinationPath, fileTypes, recursive = false, postDelete = false, preservePath = false) {
    copyFiles(sourcePath, destinationPath, fileTypes, recursive, postDelete, preservePath);
}

module.exports =  handleCopyFiles;
