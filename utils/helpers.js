
export async function timeoutPromise(ms, errorMessage) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), ms);
    });
}

export function calculatePercentage(done, total) {
    return ((done / total) * 100).toFixed(2);
}

export function calculateRemaining(done, total) {
    return total - done;
}

export function calculateFilesSizeInMB(files) {
    return (files.reduce((acc, file) => acc + file.details.size, 0) / 1024 / 1024).toFixed(2);
}

export function MBToBytes(mb) {
    return mb * 1024 * 1024;
}

export function BytesToMB(bytes) {
    return bytes / 1024 / 1024;
}

export default { timeoutPromise };