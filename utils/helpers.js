
async function timeoutPromise(ms, errorMessage) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), ms);
    });
}

function calculatePercentage(done, total) {
    return ((done / total) * 100).toFixed(2);
}

function calculateRemaining(done, total) {
    return total - done;
}

function calculateFilesSizeInMB(files) {
    return (files.reduce((acc, file) => acc + file.details.size, 0) / 1024 / 1024).toFixed(2);
}

function MBToBytes(mb) {
    return mb * 1024 * 1024;
}

function BytesToMB(bytes) {
    return bytes / 1024 / 1024;
}

module.exports = { timeoutPromise, calculatePercentage, calculateRemaining, calculateFilesSizeInMB, MBToBytes, BytesToMB };