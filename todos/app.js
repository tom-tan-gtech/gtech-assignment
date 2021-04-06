const { findInFolder } = require('./src/getTodos');

const startFolder = __dirname + '/testdir';
const searchTerm = 'TODO';

findInFolder(startFolder, searchTerm).then((todoFiles) => {
  console.log('todoFiles', todoFiles);
});

// ..............................
