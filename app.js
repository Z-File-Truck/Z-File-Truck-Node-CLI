import { handleCutFiles } from './commands/cut.js';
import { handleCopyFiles } from './commands/copy.js';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import CONSTANTS from './constants.js';


const argv = yargs(hideBin(process.argv))
    .command('copy', 'Copy files', {
        source: { description: 'The source directory path', alias: 's', type: 'string', demandOption: true, requiresArg: true },
        destination: { description: 'The destination directory path', alias: 'd', type: 'string', demandOption: true, requiresArg: true },
        'file-types': { description: `File types to include in the operation (must be an array of seperated space valid file types starts with "." example: ".jpg .jpeg .png" or use one of this values (${Object.keys(CONSTANTS.quickFileTypes).map(type => `"${type}"`).join(',')})`, alias: 'f', type: 'array', demandOption: true, requiresArg: true },
        recursive: { description: 'Whether to cut files recursively within the underlying nested folders in the source', alias: 'r', type: 'boolean', default: false },
        'post-delete': { description: 'Delete source files after copying', alias: 'pd', type: 'boolean', default: false },
        'preserve-path': { description: 'Preserve the directory structure in the destination as it was in the source', alias: 'pp', type: 'boolean', default: false}
    }, async(argv) => {
       await handleCopyFiles(argv.source, argv.destination, argv['file-types'], argv.recursive, argv['post-delete'], argv['preserve-path']);
    })
    .command('cut', 'Cut files', {
        source: { description: 'The source directory', alias: 's', type: 'string', demandOption: true, requiresArg: true },
        destination: { description: 'The destination directory', alias: 'd', type: 'string', demandOption: true, requiresArg: true },
        'file-types': { description: 'File types to include in the operation (must be an array of seperated space valid file types starts with "." example: ".jpg .jpeg .png")', alias: 'f', type: 'array', demandOption: true, requiresArg: true },
        recursive: { description: 'Whether to cut files recursively within the underlying nested folders in the source', alias: 'r', type: 'boolean', default: false },
        'preserve-path': { description: 'Preserve the directory structure in the destination as it was in the source', alias: 'pp', type: 'boolean', default: false}
    }, (argv) => {
        handleCutFiles(argv.source, argv.destination, argv['file-types'], argv.recursive, argv['preserve-path']);
    })
    .demandCommand(1, 'You need at least one command (copy or cut) to run this tool.')
    .help()
    .alias('help', 'h')
    .strict()
    .parse()


