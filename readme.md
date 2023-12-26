
# Z-File-Truck-Node-CLI

Z-File-Truck-Node-CLI is a versatile Node.js command-line tool for file operations, enabling users to efficiently copy, cut, and manage files.

  

## Features

- Copy files with specific extensions.

- Cut (move) files to a new destination.

- Recursively handle files in subdirectories.

- Optional deletion of source files after copying.

## Requirements 

  Before using Z-File-Truck-Node-CLI, ensure you have the following installed: - Node.js (v18.19.0 or later recommended): [Download & Install Node.js](https://nodejs.org/en/download/) - npm (usually comes with Node.js)
  

## Getting Started

To use Z-File-Truck-Node-CLI, clone the repository to your local machine:


```bash

git  clone  https://github.com/Z-File-Truck/Z-File-Truck-Node-CLI.git

cd  Z-File-Truck-Node-CLI

```

## Usage Section

  

### Usage

The tool provides two main functionalities: copying and cutting files.


#### Copying Files

To copy files, use the following command format:

```bash
node index.js copy --source "source_path" --destination "destination_path" --file-types .jpg .txt --recursive --preserve-path --post-delete --file-cnt-limit 100 --file-size-limit 200
```
This will copy .jpg and .txt files from source_path to destination_path recursively with deleting the files from source post-copying and preserving the folder path structure which was in the source in the destination, with setting the files limit to 100 and the maxmium size to 500mb

- `--source, -s`: The path to the source directory (required).
- `--destination, -d`: The path to the destination directory (required).
- `--file-types, -f`: Specify file types to include (e.g., .jpg, .txt) (required).
- `--recursive, -r`: Recursively copy files from subdirectories (default: false).
- `--post-delete, -pd`: Delete source files after copying (default: false).
- `--preserve-path, -pp`: Maintain the same directory structure in the destination (default: false).
- `--file-cnt-limit, -cl`: Limit the number of files to operate on (default: 1000).
- `--file-size-limit, -sl`: Limit the total size of files to operate in MB (default: 500).

#### Cutting Files

To cut (move) files, use the following command format:

```bash

node index.js cut --source "source_path" --destination "destination_path" --file-types .jpg .txt --recursive --preserve-path --file-cnt-limit 100 --file-size-limit 100


```

This will move .jpg and .txt files from source_path to destination_path recursively with preserving the folder path structure which was in the source in the destination, with setting the files limit to 100 and the maxmium size to 500mb


- `--source, -s`: The path to the source directory (required).
- `--destination, -d`: The path to the destination directory (required).
- `--file-types, -f`: Specify file types to include (e.g., .jpg, .txt) (required).
- `--recursive, -r`: Recursively copy files from subdirectories (default: false).
- `--preserve-path, -pp`: Maintain the same directory structure in the destination (default: false).
- `--file-cnt-limit, -cl`: Limit the number of files to operate on (default: 1000).
- `--file-size-limit, -sl`: Limit the total size of files to operate in MB (default: 500).

#### Opening UI

```bash

node index.js ui


```

The ui command in this Node.js script provides an interactive user interface for performing file operations like copying or cutting. It leverages the inquirer package to guide users through a series of prompts, collecting necessary inputs such as source and destination directories, file types (with options for predefined or custom types), and settings like recursion, post-operation deletion, and preservation of directory structure. The command also includes validation checks to ensure correct input and defaults for file count and size limits. This feature is designed for ease of use, catering to both novice and advanced users who need a straightforward way to manage file operations.
  

### Contributing Section

  


We welcome contributions to the Z-File-Truck-Node-CLI project. If you're interested in helping out, please follow these steps:

  

1. **Fork the Repository:** Fork the project to your own GitHub account.

2. **Create a Branch:** Create a branch in your fork for your contributions.

3. **Make Your Changes:** Implement your changes or improvements in your branch.

4. **Test the Changes:** Ensure that your changes are working as expected.

5. **Submit a Pull Request:** Open a pull request from your branch to the main Z-File-Truck-Node-CLI repository.

  

We appreciate contributions of all kinds - from bug fixes to feature enhancements!



  
  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.