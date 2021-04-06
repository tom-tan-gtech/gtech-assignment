const {
  getFiles,
  getFilesAsync,
  readFile,
  containsTerms,
  getTodoFiles,
  findInFolder,
} = require('../getTodos');

const testFolder =
  '/Users/tom/Tom_MACFolders/Projects/find-todos/todos/testdir';
const searchTerm = 'TODO';

it('getFiles - returns 7 files', () => {
  const files = getFiles(testFolder);
  expect(files.length).toEqual(7);
});

it('getFilesAsync - returns 7 files async', async () => {
  const files = await getFilesAsync(testFolder);
  expect(files.length).toEqual(7);
});

it('readFile - reads a file correctly', async () => {
  const testFile = `${testFolder}/somedir/somemodule/somefile.js`;
  const data = await readFile(testFile);
  expect(data.toString()).toContain(
    'Initializes translation dictionary with contents from /public/locales'
  );
});

it('readFile - reads an empty file correctly', async () => {
  const testFile = `${testFolder}/somedir3/empty.js`;
  const data = await readFile(testFile);
  expect(data.toString()).not.toContain(
    'Initializes translation dictionary with contents from /public/locales'
  );
});

it('containsTerms - file should contain the search term', async () => {
  const testFile = `${testFolder}/somedir/somemodule/somefile.js`;
  const value = await containsTerms(testFile, searchTerm);
  expect(value).toEqual(true);
});

it('containsTerms - file should NOT contain the search term', async () => {
  const testFile = `${testFolder}/somedir3/empty.js`;
  const value = await containsTerms(testFile, searchTerm);
  expect(value).toEqual(false);
});

it('getTodoFiles - should find 3 todo files', async () => {
  const fileList = [
    `${testFolder}/somedir/somemodule/somefile.js`,
    `${testFolder}/somedir/somemodule/somefile.js`,
    `${testFolder}/somedir/somemodule/somefile.js`,
  ];
  const todoFiles = await getTodoFiles(fileList, searchTerm);
  expect(todoFiles.length).toEqual(3);
});

it('getTodoFiles - should find 2 todo files', async () => {
  const fileList = [
    `${testFolder}/somedir/somemodule/somefile.js`,
    `${testFolder}/somedir/somemodule/somefile.js`,
    `${testFolder}/somedir3/empty.js`,
  ];
  const todoFiles = await getTodoFiles(fileList, searchTerm);
  expect(todoFiles.length).toEqual(2);
});

it('findInFolder - should find 5 todo files in folder', async () => {
  const todoFiles = await findInFolder(testFolder, searchTerm);
  expect(todoFiles.length).toEqual(5);
});
