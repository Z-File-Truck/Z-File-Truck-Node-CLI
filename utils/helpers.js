
export async function timeoutPromise(ms, errorMessage) {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error(errorMessage)), ms);
    });
}

export default { timeoutPromise };