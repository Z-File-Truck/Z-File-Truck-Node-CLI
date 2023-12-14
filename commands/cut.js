const { cutFiles } = require('../utils');

function handleCutFiles(sourcePath, destinationPath, fileTypes, recursive = false, preservePath = false) {
    cutFiles(sourcePath, destinationPath, fileTypes, recursive, {preservePath});
}



module.exports =  handleCutFiles;
