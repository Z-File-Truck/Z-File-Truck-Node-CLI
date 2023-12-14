const fs = require('fs');

function cutFile(src, dest, options) {
    fs.renameSync(src, dest);
}

function copyFile(src, dest, options) {
    fs.copyFileSync(src, dest);
    if (options && options.postDelete) {
        fs.unlinkSync(src);
    }
}

module.exports =  { cutFile, copyFile }