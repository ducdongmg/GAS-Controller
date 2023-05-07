/**
 * Upload file to Google Drive.
 * Throws an error if the user doesn't have permission to upload to the target folder.
 *
 * @param {Object} obj - The object to upload.
 * @param {string} targetFolderUrl - The URL of the target folder.
 * @returns {string} The URL of the uploaded file.
 */
function uploadFileToDrive(obj, targetFolderUrl) {
  const blob = Utilities.newBlob(obj.bytes, obj.mimeType, obj.filename);
  const targetFolder = DriveApp.getFolderById(
    targetFolderUrl.replace(/^.+\//, "").replace(/\?.+/, "")
  );

  if (!isFolderAllowed(targetFolder)) {
    throw new Error(`You don't have permission to upload to this folder.`);
  }

  const uploadedFile = targetFolder.createFile(blob);
  Logger.log(`File has been uploaded to folder ${targetFolder.getName()}`);
  return uploadedFile.getUrl();
}

/**
 * Check whether the given folder is allowed to access.
 * Returns true if the folder is the root folder or a subfolder of the root folder, false otherwise.
 *
 * @param {Folder} folder - The folder to check.
 * @returns {boolean} Whether the folder is allowed to access.
 */
function isFolderAllowed(folder) {
  let parentFolder = folder.getParents().next();

  while (parentFolder.getId() !== DriveApp.getRootFolder().getId()) {
    parentFolder = parentFolder.getParents().next();
  }

  return (
    folder.getId() === DEVELOP_FOLDER_ID ||
    parentFolder.getId() === DEVELOP_FOLDER_ID
  );
}

/**
 * Find a file with the given name in the given folder.
 * Returns the file if found, null otherwise.
 *
 * @param {Folder} folder - The folder to search.
 * @param {string} name - The name of the file.
 * @returns {File|null} The file with the given name, or null if not found.
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
