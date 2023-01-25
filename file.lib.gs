/**
 * Find files in target folder
 */
function findFileIn(folder, name) {
  var files = filesIn(folder);
  var names = fileNames(files);
  if (checkValIn(names, name)) {
    var file = folder.getFilesByName(name).next();
    return file;
  }
}

/**
 * Return all files in target folder
 */
function filesIn(folder) {
  var filderInterator  = folder.getFiles();
  var arr = [];
  while (filderInterator.hasNext()) {
    var file = filderInterator.next();
    arr.push(file);
  } 
  return arr;
}

/**
 * returns an array of filenames
 */
function fileNames(files) {
  var arr = [];
  for (var i = 0; i < files.length; i++) {
    var name = files[i].getName();
    arr.push(name);
  }
  return arr;
}

/**
 * true if the value is exist in the array
 */
function checkValIn(arr, val) { 
  return arr.indexOf(val) > -1; 
}
