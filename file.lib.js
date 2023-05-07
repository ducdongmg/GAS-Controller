function uploadFileToDrive(obj, targetUploadFolderUrl) {
  let blob = Utilities.newBlob(obj.bytes, obj.mimeType, obj.filename);
  let targetFolder = getFolderByUrl(targetUploadFolderUrl);

  let isAllowToUploadResult = isAllowToUpload(targetFolder);

  if (isAllowToUploadResult) {
    targetFolder.createFile(blob);
    Logger.log("File has been uploaded to folder " + targetFolder.getName());
    return targetUploadFolderUrl;
  } else {
    Logger.log("Cannot upload file to this folder " + targetFolder.getName());
    throw new Error("You don't have permission to upload to this folder.");
  }
}

/**
 * Find files in target folder
 */
function findFileIn(folder, name) {
  let files = filesIn(folder);
  let names = fileNames(files);
  if (checkValIn(names, name)) {
    return folder.getFilesByName(name).next();
  }
}

/**
 * Return all files in target folder
 */
function filesIn(folder) {
  let filderInterator = folder.getFiles();
  let arr = [];
  while (filderInterator.hasNext()) {
    arr.push(filderInterator.next());
  }
  return arr;
}

/**
 * returns an array of filenames
 */
function fileNames(files) {
  let arr = [];
  for (let i = 0; i < files.length; i++) {
    arr.push(files[i].getName());
  }
  return arr;
}

/**
 * true if the value is exist in the array
 */
function checkValIn(arr, val) {
  return arr.indexOf(val) > -1;
}

/**
 * check current folder is allow to access
 */
function isAllowToUpload(targetFolder) {
  // target folder is root folder
  if (targetFolder.getId() === DEVELOP_FOLDER_ID) {
    return true;
  }

  let parentFolders = targetFolder.getParents();
  while (parentFolders.hasNext()) {
    let parentFolder = parentFolders.next();
    Logger.log("Parent folder: " + parentFolder.getName());
    Logger.log("Parent folder id: " + parentFolder.getId());

    if (parentFolder.getId() === DEVELOP_FOLDER_ID) {
      return true;
    }

    // check next parent (up 1 level)
    parentFolders = parentFolder.getParents();
  }

  return false;
}
