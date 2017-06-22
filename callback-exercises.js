var fs = require('fs');
var verror = require('verror');

function readFiles(files, callback) {
  var filesLeft = files.length;
  var contents = {};
  var error = null;
  var processContent = function(filePath) {
    return function(err, data) {
      console.log('inside callback')
      // an error was previously encountered and the callback was invoked
      if (error !== null) {return}

  // an error happen while trying to read the file, so invoke the callback
  if (err) {
    error = err;
    return callback(new verror(err, 'failed to read file %s', filePath));
  }

  contents[filePath] = data;

  // after the last file read was executed, invoke the callback
  if (!--filesLeft) {
    console.log('empty')
    callback(null, contents);
  }
};

  };

  files.forEach(function(filePath) {
    console.log('inside loop')
    fs.readFile(filePath, processContent(filePath));
  });
}
var arr = process.argv
readFiles(arr, function(err, chunk) {
  if (err)
    console.log(err)
  else
    console.log(chunk)
})
// arr.forEach(function(val, index) {
//   console.log(index + ':' + val)
// })
