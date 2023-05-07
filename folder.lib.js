/**
 * Create target folder with given path array
 * @param {Array} arrPath - an array of strings representing the path to the target folder
 * @returns {Folder} - the target folder
 */
function createFolderForTemplateFile(arrPath) {
  // Get the root folder where the new folder will be created
  let developFolder = DriveApp.getFolderById(DEVELOP_FOLDER_ID);

  // Call the helper function to create or retrieve folders for each item in the path array
  return createFoldersInPath(developFolder, arrPath);
}

/**
 * Create or retrieve folders for each item in the path array
 * @param {Folder} baseFolder - the parent folder for the current item in the path array
 * @param {Array} arrPath - an array of strings representing the path to the target folder
 * @returns {Folder} - the target folder
 */
function createFoldersInPath(baseFolder, arrPath) {
  let parentFolder;
  let folderIterator;

  // Loop through each item in the path array
  for (let i = 0; i < arrPath.length; i++) {
    if (i === 0) {
      // For the first item, use the root folder as the parent
      parentFolder = baseFolder;
    }

    // Get an iterator for the child folders of the parent folder with the current item name
    folderIterator = parentFolder.getFoldersByName(arrPath[i]);

    // If there are no child folders with the current item name, create one
    if (!folderIterator.hasNext()) {
      parentFolder.createFolder(arrPath[i]);
      folderIterator = parentFolder.getFoldersByName(arrPath[i]);
    }

    // Move to the child folder with the current item name
    parentFolder = folderIterator.next();
    console.log(parentFolder.toString());
  }

  // Return the final folder in the path array
  return parentFolder;
}

/**
 * Retrieve a folder object based on a given URL
 * @param {string} folderUrl - the URL of the target folder
 * @returns {Folder} - the target folder object
 */
function getFolderByUrl(folderUrl) {
  // Extract the folder ID from the URL and retrieve the corresponding folder object
  return DriveApp.getFolderById(
    folderUrl.replace(/^.+\//, "").replace(/\?.+/, "")
  );
}
