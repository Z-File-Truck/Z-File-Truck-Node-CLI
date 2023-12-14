
# Z-file-truck-cmd

Z-file-truck-cmd is a versatile Node.js command-line tool for file operations, enabling users to efficiently copy, cut, and manage files.

  

## Features

- Copy files with specific extensions.

- Cut (move) files to a new destination.

- Recursively handle files in subdirectories.

- Optional deletion of source files after copying.

## Requirements 

  Before using Z-file-truck-cmd, ensure you have the following installed: - Node.js (v12 or later recommended): [Download & Install Node.js](https://nodejs.org/en/download/) - npm (usually comes with Node.js)
  

## Getting Started

To use Z-file-truck-cmd, clone the repository to your local machine:


```bash

git  clone  https://github.com/your-username/z-file-truck-cmd.git

cd  z-file-truck-cmd

```

## Usage Section

  

### Usage

The tool provides two main functionalities: copying and cutting files.

  

#### Copying Files

To copy files, use the following command format:

```bash

node  app.js  copy  --source  "source_path"  --destination  "destination_path"  --fileTypes  .jpg  .txt  --recursive

```

This will copy .jpg and .txt files from source_path to destination_path recursively.

  

#### Cutting Files

To cut (move) files, use the following command format:

```bash

node  app.js  cut  --source  "source_path"  --destination  "destination_path"  --fileTypes  .jpg  .txt  --recursive

```

This will move .jpg and .txt files from source_path to destination_path recursively.



  

### Contributing Section

  


We welcome contributions to the Z-file-truck-cmd project. If you're interested in helping out, please follow these steps:

  

1. **Fork the Repository:** Fork the project to your own GitHub account.

2. **Create a Branch:** Create a branch in your fork for your contributions.

3. **Make Your Changes:** Implement your changes or improvements in your branch.

4. **Test the Changes:** Ensure that your changes are working as expected.

5. **Submit a Pull Request:** Open a pull request from your branch to the main Z-file-truck-cmd repository.

  

We appreciate contributions of all kinds - from bug fixes to feature enhancements!



  
  

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.