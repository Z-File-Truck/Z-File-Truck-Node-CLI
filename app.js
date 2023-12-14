const handleCopyFiles = require('./commands/copy');
const handleCutFiles = require('./commands/cut');
const yargs = require('yargs');

const argv = yargs
    .command('copy', 'Copy files', {
        source: { description: 'The source directory', alias: 's', type: 'string' },
        destination: { description: 'The destination directory', alias: 'd', type: 'string' },
        fileTypes: { description: 'File types to include', alias: 'f', type: 'array' },
        recursive: { description: 'Whether to copy files recursively', alias: 'r', type: 'boolean', default: false },
        postDelete: { description: 'Delete source files after copying', alias: 'pd', type: 'boolean', default: false },
        preservePath: { description: 'Preserve the directory structure in the destination', alias: 'pp', type: 'boolean', default: false}
    })
    .command('cut', 'Cut files', {
        source: { description: 'The source directory', alias: 's', type: 'string' },
        destination: { description: 'The destination directory', alias: 'd', type: 'string' },
        fileTypes: { description: 'File types to include', alias: 'f', type: 'array' },
        recursive: { description: 'Whether to cut files recursively', alias: 'r', type: 'boolean', default: false },
        preservePath: { description: 'Preserve the directory structure in the destination', alias: 'pp', type: 'boolean', default: false}
    })
    .help()
    .alias('help', 'h')
    .argv;

if (argv._.includes('copy')) {
    handleCopyFiles(argv.source, argv.destination, argv.fileTypes, argv.recursive, argv.postDelete, argv.preservePath);
} else if (argv._.includes('cut')) {
    handleCutFiles(argv.source, argv.destination, argv.fileTypes, argv.recursive, argv.preservePath);
}
