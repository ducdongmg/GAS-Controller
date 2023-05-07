/**
 * Create target folder
 */
function createFolderForTemplateFile(arrPath) {
  let developFolder = DriveApp.getFolderById(DEVELOP_FOLDER_ID);
  return createVerifyPath(developFolder, arrPath);
}

function createVerifyPath(baseFolder, arrPath) {
  let parentFolder;
  let folderInterator;
  for (let i = 0; i < arrPath.length; i++) {
    if (i === 0) {
      parentFolder = baseFolder;
    }
    folderInterator = parentFolder.getFoldersByName(arrPath[i]);

    if (!folderInterator.hasNext()) {
      parentFolder.createFolder(arrPath[i]);
      folderInterator = parentFolder.getFoldersByName(arrPath[i]);
    }

    parentFolder = folderInterator.next();
    console.log(parentFolder.toString());
  }

  return parentFolder;
}

function getFolderByUrl(folderUrl) {
  return DriveApp.getFolderById(
    folderUrl.replace(/^.+\//, "").replace(/\?.+/, "")
  );
}
