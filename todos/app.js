const { findInFolder } = require('./src/getTodos');

const startFolder = __dirname + '/testdir';
const searchTerm = 'TODO';

findInFolder(startFolder, searchTerm).then((todoFiles) => {
  console.clear();
  console.log(
    `The application found ${todoFiles.length} files that contain the TODO keyword:`
  );
  console.log('todoFiles', todoFiles);
});

// ..............................
