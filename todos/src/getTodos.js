const fs = require('fs');
const fsPromises = require('fs').promises;
const path = require('path');

function getFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  items.forEach((item) => {
    let fullPath = path.join(dir, item);
    if (fs.lstatSync(fullPath).isDirectory()) {
      const f = getFiles(fullPath);
      files = files.concat(f);
    } else {
      files.push(fullPath);
    }
  });
  return files;
}

async function getFilesAsync(dir) {
  let files = [];
  const items = await fsPromises.readdir(dir);
  for (const item of items) {
    let absolutePath = path.join(dir, item);
    const stat = await fsPromises.lstat(absolutePath);
    if (stat.isDirectory()) {
      const f = await getFilesAsync(absolutePath);
      files = files.concat(f);
    } else {
      files.push(absolutePath);
    }
  }
  return files;
}

async function readFile(path) {
  try {
    const data = await fsPromises.readFile(path);
    return data;
  } catch (err) {
    console.log(err);
  }
}

async function containsTerms(file, searchTerm) {
  const data = (await readFile(file)).toString();
  return data.includes(searchTerm);
}

async function getTodoFiles(fileList, searchTerm) {
  let todoFiles = [];
  for (const file of fileList) {
    if (await containsTerms(file, searchTerm)) {
      todoFiles.push(file);
    }
  }
  return todoFiles;
}

async function findInFolder(startFolder, searchTerm) {
  try {
    const fileList = await getFilesAsync(startFolder);
    const todoFiles = await getTodoFiles(fileList, searchTerm);
    return todoFiles;
  } catch (err) {
    console.log(err);
  }
}

module.exports.getFiles = getFiles;
module.exports.getFilesAsync = getFilesAsync;
module.exports.readFile = readFile;
module.exports.containsTerms = containsTerms;
module.exports.getTodoFiles = getTodoFiles;
module.exports.findInFolder = findInFolder;
