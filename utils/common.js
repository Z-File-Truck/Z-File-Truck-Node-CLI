import fs from 'fs/promises';
import path from 'path';
import ora from 'ora';
// export function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, fileTypes, recursive, preservePath, FileFoundCallback) {
//     const files = fs.readdirSync(currentPath);

//     files.forEach(file => {
//         const curSrcFileFullPath = path.join(currentPath, file);
//         const stat = fs.statSync(curSrcFileFullPath);

//         if (stat.isDirectory() && recursive) {
//             const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
//             traverseDirectory(sourcePath, curSrcFileFullPath, destinationPath, newDestination, filesList, fileTypes, recursive, preservePath);
//         } else if (stat.isFile() && (fileTypes.includes(path.extname(file)) || fileTypes.includes('*'))) {
//             const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
//             const destFilePath = path.join(destinationPath, relativePath);
            
//             filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath });
//             if(FileFoundCallback)
//                 FileFoundCallback(filesList);
//         }
//     });
// }

export async function traverseDirectory(sourcePath, currentPath, destinationPath, currentDestination, filesList, fileTypes, recursive, preservePath, FileFoundCallback, FailCallback) {
    const stack = [currentPath];

    while (stack.length > 0) {
        const currentDir = stack.pop();
        try {
            // Create a promise that rejects after 1 second
            const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Read directory operation timeout')), 10000));
            // Race the timeout against the readdir operation
            const files = await Promise.race([fs.readdir(currentDir), timeoutPromise]);

            for (const file of files) {
                const curSrcFileFullPath = path.join(currentDir, file);
                try {
                    const statTimeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error('Stat operation timeout')), 200));
                    const stat = await Promise.race([fs.stat(curSrcFileFullPath), statTimeoutPromise]);

                    if (stat.isDirectory() && recursive) {
                        const newDestination = preservePath ? path.join(currentDestination, file) : currentDestination;
                        stack.push(curSrcFileFullPath);
                    } else if (stat.isFile() && (fileTypes.includes(path.extname(file)) || fileTypes.includes('*'))) {
                        const relativePath = preservePath ? path.relative(sourcePath, curSrcFileFullPath) : path.basename(curSrcFileFullPath);
                        const destFilePath = path.join(destinationPath, relativePath);

                        filesList.push({ srcFilePath: curSrcFileFullPath, destFilePath: destFilePath });
                        await FileFoundCallback(filesList.length);
                    }
                } catch (err) {
                    await FailCallback(`Error processing path: ${curSrcFileFullPath}: ${err}`);
                    continue;
                }
            }
        } catch (err) {
            await FailCallback(`Error reading directory: ${currentDir}: ${err}`);
            continue;
        }
    }
}

export async function collectFiles(sourcePath, destinationPath = '', fileTypes, recursive, preservePath) {
    let filesList = [];
    const spinner = ora('Reading Files...').start();

    await traverseDirectory(
        sourcePath, sourcePath, destinationPath, destinationPath, filesList, fileTypes, recursive, preservePath, 
        async (count) => {
            spinner.text = `Reading Files... ${count} files found`;
        }, 
        async (message) => {
            spinner.fail(message);
            spinner.start();
        }
    );

    spinner.succeed(`Reading Files Done... ${filesList.length} files found`);
    spinner.stop();
    return filesList;
}

export default { collectFiles, traverseDirectory };