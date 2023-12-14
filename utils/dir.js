import fs from 'fs';
import path from 'path';

export function createParentDir(filePath) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true });
}




export default { createParentDir };