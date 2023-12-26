#!/usr/bin/env node

const handleCutFiles = require('./commands/cut.js');
const handleCopyFiles = require('./commands/copy.js');
const yargs = require('yargs');
const { hideBin } = require('yargs/helpers');
const CONSTANTS = require('./constants.js');
const inquirer = require('inquirer');

const argv = yargs(hideBin(process.argv))
    .command('copy', 'Copy files', {
        source: { description: 'The source directory path', alias: 's', type: 'string', demandOption: true, requiresArg: true },
        destination: { description: 'The destination directory path', alias: 'd', type: 'string', demandOption: true, requiresArg: true },
        'file-types': { description: `File types to include in the operation (must be an array of seperated space valid file types starts with "." example: ".jpg .jpeg .png" or use one of this values (${Object.keys(CONSTANTS.QUICK_FILE_TYPES).map(type => `"${type}"`).join(',')})`, alias: 'f', type: 'array', demandOption: true, requiresArg: true },
        recursive: { description: 'Whether to cut files recursively within the underlying nested folders in the source', alias: 'r', type: 'boolean', default: false },
        'post-delete': { description: 'Delete source files after copying', alias: 'pd', type: 'boolean', default: false },
        'preserve-path': { description: 'Preserve the directory structure in the destination as it was in the source', alias: 'pp', type: 'boolean', default: false },
        'file-cnt-limit': { description: 'Limit number of files to operate', alias: 'cl', type: 'number', default: CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, requiresArg: true },
        'file-size-limit': { description: 'Limit files total size (in MB) to operate', alias: 'sl', type: 'number', default: CONSTANTS.DEFAULT_MB_SIZE_LIMIT, requiresArg: true },
    }, async(argv) => {
       await handleCopyFiles(argv.source, argv.destination, argv['file-types'], argv.recursive, argv['post-delete'], argv['preserve-path'], argv['file-cnt-limit'], argv['file-size-limit']);
    })
    .command('cut', 'Cut files', {
        source: { description: 'The source directory', alias: 's', type: 'string', demandOption: true, requiresArg: true },
        destination: { description: 'The destination directory', alias: 'd', type: 'string', demandOption: true, requiresArg: true },
        'file-types': { description: 'File types to include in the operation (must be an array of seperated space valid file types starts with "." example: ".jpg .jpeg .png")', alias: 'f', type: 'array', demandOption: true, requiresArg: true },
        recursive: { description: 'Whether to cut files recursively within the underlying nested folders in the source', alias: 'r', type: 'boolean', default: false },
        'preserve-path': { description: 'Preserve the directory structure in the destination as it was in the source', alias: 'pp', type: 'boolean', default: false },
        'file-cnt-limit': { description: 'Limit number of files to operate', alias: 'cl', type: 'number', default: CONSTANTS.DEFAULT_FILES_COUNT_LIMIT, requiresArg: true },
        'file-size-limit': { description: 'Limit files total size (in MB) to operate', alias: 'sl', type: 'number', default: CONSTANTS.DEFAULT_MB_SIZE_LIMIT, requiresArg: true },
    }, async(argv) => {
        await handleCutFiles(argv.source, argv.destination, argv['file-types'], argv.recursive, argv['preserve-path'], argv['file-cnt-limit'], argv['file-size-limit']);
    })
    .command('ui', 'Show Interface', async() => {
        async function Recursive_UI(resolve, reject) {
            const answers = await inquirer.prompt([
                {
                    type: 'list',
                    name: 'action',
                    message: 'What action do you want to perform?',
                    choices: ['Copy', 'Cut'],
                },
                {
                    type: 'input',
                    name: 'source',
                    message: 'Enter the source directory path:',
                    validate: input => !!input.trim(),
                },
                {
                    type: 'input',
                    name: 'destination',
                    message: 'Enter the destination directory path:',
                    validate: input => !!input.trim(),
                },
                {
                    type: 'checkbox',
                    name: 'fileTypes',
                    message: 'Select file types to include in the operation:',
                    choices: [
                        // Add predefined file types
                        ...Object.keys(CONSTANTS.QUICK_FILE_TYPES).map(type => ({
                            name: CONSTANTS.QUICK_FILE_TYPES[type].desc,
                            value: type,
                        })),
                        // Allow the user to enter their own file types
                        // new inquirer.Separator('-----'),
                        {
                            name: 'Enter custom file types',
                            value: 'custom',
                        },
                    ],
                    default: ['all'],
                    validate: (input) => {
                        if (input.length === 0) {
                            return 'Please select at least one file type.';
                        }
                        return true;
                    },
                    pageSize: 15,
                },
                {
                    type: 'input',
                    name: 'customFileTypes',
                    message: 'Enter your own array of extensions (comma-separated, e.g., ".doc,.xls"):',
                    when: answers => answers.fileTypes.includes('custom'),
                    validate: input => /^(\.\w+,\s*)*(\.\w+)$/.test(input.trim()),
                },
                {
                    type: 'confirm',
                    name: 'recursive',
                    message: 'Do you want to perform the operation recursively within nested folders?',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'postDelete',
                    message: 'Do you want to delete source files after copying?',
                    when: answers => answers.action === 'Copy',
                    default: false,
                },
                {
                    type: 'confirm',
                    name: 'preservePath',
                    message: 'Do you want to preserve the directory structure in the destination as it was in the source?',
                    default: false,
                },
                {
                    type: 'number',
                    name: 'fileCountLimit',
                    message: 'Enter the limit for the number of files to operate:',
                    default: CONSTANTS.DEFAULT_FILES_COUNT_LIMIT,
                    validate: input => Number.isInteger(input) && input > 0,
                },
                {
                    type: 'number',
                    name: 'fileSizeLimit',
                    message: 'Enter the limit for the total size of files to operate (in MB):',
                    default: CONSTANTS.DEFAULT_MB_SIZE_LIMIT,
                    validate: input => Number.isInteger(input) && input > 0,
                },
            ]);
            // Filter out the custom file types if the user didn't enter any
            answers.fileTypes = answers.fileTypes
                .reduce((acc, curr) => curr !== 'custom' ? [...acc, curr] : acc, answers.customFileTypes ? answers.customFileTypes.split(',').map(ext => ext.trim()) : []);
            // console.log(answers)
            await (async() => {
                if (answers.action === 'Copy') {
                    await handleCopyFiles(
                        answers.source,
                        answers.destination,
                        answers.fileTypes,
                        answers.recursive,
                        answers.postDelete,
                        answers.preservePath,
                        answers.fileCountLimit,
                        answers.fileSizeLimit
                    );
                } else if (answers.action === 'Cut') {
                    await handleCutFiles(
                        answers.source,
                        answers.destination,
                        answers.fileTypes,
                        answers.recursive,
                        answers.preservePath,
                        answers.fileCountLimit,
                        answers.fileSizeLimit
                    );
                }
            })().then(async() => await Recursive_UI());
            // await Recursive_UI();
        };
        await Recursive_UI();
        
    })
    .demandCommand(1, 'You need at least one command (copy or cut) to run this tool.')
    .help()
    .alias('help', 'h')
    .alias('version', 'v')
    .strict()
    .parse()


