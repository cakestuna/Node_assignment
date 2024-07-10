const fs = require('fs');
const path = require('path');

// Get the operation and file path from command line arguments
const operation = process.argv[2];
const targetPath = process.argv[3];
const additionalArgs = process.argv.slice(4); // Any additional arguments like content for append

// Function to read the contents of a file
function readFile(filePath) {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error(`Error reading file '${filePath}': ${err.message}`);
        } else {
            console.log(`Contents of file '${filePath}':\n${data}`);
        }
    });
}

// Function to delete a file
function deleteFile(filePath) {
    fs.unlink(filePath, (err) => {
        if (err) {
            console.error(`Error deleting file '${filePath}': ${err.message}`);
        } else {
            console.log(`File '${filePath}' deleted`);
        }
    });
}

// Function to create a new file
function createFile(filePath) {
    fs.writeFile(filePath, '', (err) => {
        if (err) {
            console.error(`Error creating file '${filePath}': ${err.message}`);
        } else {
            console.log(`File '${filePath}' created`);
        }
    });
}

// Function to append content to a file
function appendToFile(filePath, content) {
    fs.appendFile(filePath, content + '\n', 'utf8', (err) => {
        if (err) {
            console.error(`Error appending to file '${filePath}': ${err.message}`);
        } else {
            console.log(`Content appended to file '${filePath}'`);
        }
    });
}

// Function to rename a file
function renameFile(oldPath, newPath) {
    fs.rename(oldPath, newPath, (err) => {
        if (err) {
            console.error(`Error renaming file '${oldPath}' to '${newPath}': ${err.message}`);
        } else {
            console.log(`File '${oldPath}' renamed to '${newPath}'`);
        }
    });
}

// Function to list files in a directory
function listFiles(dirPath) {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.error(`Error reading directory '${dirPath}': ${err.message}`);
        } else {
            console.log(`Files in directory '${dirPath}':`);
            files.forEach(file => {
                console.log(file);
            });
        }
    });
}

// Switch based on the operation passed
switch (operation) {
    case 'read':
        if (!targetPath) {
            console.error("Please provide a file path to read");
        } else {
            readFile(targetPath);
        }
        break;

    case 'delete':
        if (!targetPath) {
            console.error("Please provide a file path to delete");
        } else {
            deleteFile(targetPath);
        }
        break;

    case 'create':
        if (!targetPath) {
            console.error("Please provide a file path to create");
        } else {
            createFile(targetPath);
        }
        break;

    case 'append':
        if (!targetPath || additionalArgs.length === 0) {
            console.error("Please provide a file path and content to append");
        } else {
            appendToFile(targetPath, additionalArgs.join(' '));
        }
        break;

    case 'rename':
        if (!targetPath || additionalArgs.length === 0) {
            console.error("Please provide both old and new file paths for renaming");
        } else {
            const newPath = additionalArgs[0];
            renameFile(targetPath, newPath);
        }
        break;

    case 'list':
        const dirPath = targetPath || '.';
        listFiles(dirPath);
        break;

    default:
        console.error(`Invalid operation '${operation}'`);
}
