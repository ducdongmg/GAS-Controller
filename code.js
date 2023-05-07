const DEVELOP_FOLDER_ID = "parent folder id";

const TEMPLATE_CHECKLIST_ID = "spreadsheet file id";
const TEMPLATE_OUTLINE_DESIGN_ID = "spreadsheet file id";
const TEMPLATE_DETAIL_DESIGN_ID = "spreadsheet file id";
const TEMPLATE_TEST_ID = "spreadsheet file id";

const TEMPLATE_TYPE_OUTLINE = "outline";
const TEMPLATE_TYPE_DETAIL = "detail";
const TEMPLATE_TYPE_TEST = "test";
const TEMPLATE_TYPE_CHECK_LIST = "checklist";

const TEST_SPECIFICATION_FOLDER_NAME = "003.実装・単体テスト";
const DETAIL_DESIGN_FOLDER_NAME = "002.詳細設計書";
const OUTLINE_DESIGN_FOLDER_NAME = "001.概要設計書";

/**
 * loading Screen UI
 */
function doGet() {
  return HtmlService.createTemplateFromFile("copy_template_page").evaluate();
}

/**
 * for importing other html files
 */
function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function tesing() {
  /*
  let targetFolderUrl = "https://drive.google.com/drive/u/0/folders/1yxxxxxx";
  let templateType = "detail";
  let rs = executeCopyTemplateByUrl(targetFolderUrl, templateType)
  console.log(rs);
*/
  let version = "v10.0";
  let featureName = "fearter ";
  let rs = execCreateDevelopFolder(version, featureName);
  console.log(rs);
}

function executeCopyTemplateByUrl(targetFolderUrl, templateType) {
  console.log(templateType);
  const folder = DriveApp.getFolderById(
    targetFolderUrl.replace(/^.+\//, "").replace(/\?.+/, "")
  );

  if (!isFolderAllowed(folder)) {
    throw new Error(`You don't have permission in target folder.`);
  }

  let url = (templateName = "");
  switch (templateType) {
    case TEMPLATE_TYPE_CHECK_LIST:
      url = copyFile(TEMPLATE_CHECKLIST_ID, folder);
      templateName = "Check List Url";
      break;

    case TEMPLATE_TYPE_OUTLINE:
      url = copyFile(TEMPLATE_OUTLINE_DESIGN_ID, folder);
      templateName = "Outline Url";
      break;

    case TEMPLATE_TYPE_DETAIL:
      url = copyFile(TEMPLATE_DETAIL_DESIGN_ID, folder);
      templateName = "Detail Url";
      break;

    case TEMPLATE_TYPE_TEST:
      url = copyFile(TEMPLATE_TEST_ID, folder);
      templateName = "Test Url";
      break;

    default:
      // do nothing
      break;
  }
  console.log(url);
  return [templateName, url];
}

function execCreateDevelopFolder(version, featureName) {
  let devFolder = createFolder(version, featureName);
  copyOutlineDesignTemplate(version, featureName);

  copyDetailDesignTemplate(version, featureName);

  copyTestTemplate(version, featureName);

  copyCheckListTemplate(version, featureName);

  let folderUrl = devFolder.getUrl();
  console.log(folderUrl);
  return folderUrl;
}

/**
 * Copy checklist file
 */
function createFolder(version, featureName) {
  let arrPath = [];
  arrPath.push(version);
  arrPath.push(featureName);

  return createFolderForTemplateFile(arrPath);
}

/**
 * Copy checklist file
 */
function copyCheckListTemplate(version, featureName) {
  let arrPath = [];
  arrPath.push(version);
  arrPath.push(featureName);

  return copyTemplate(TEMPLATE_CHECKLIST_ID, arrPath);
}

/**
 * Copy the outline design document file
 */
function copyOutlineDesignTemplate(version, featureName) {
  let targetFolder = OUTLINE_DESIGN_FOLDER_NAME;
  let arrPath = [];
  arrPath.push(version);
  arrPath.push(featureName);
  arrPath.push(targetFolder);

  return copyTemplate(TEMPLATE_OUTLINE_DESIGN_ID, arrPath);
}

/**
 * Copy detailed design file
 */
function copyDetailDesignTemplate(version, featureName) {
  let targetFolder = DETAIL_DESIGN_FOLDER_NAME;
  let arrPath = [];
  arrPath.push(version);
  arrPath.push(featureName);
  arrPath.push(targetFolder);

  return copyTemplate(TEMPLATE_DETAIL_DESIGN_ID, arrPath);
}

/**
 * Copy the test specification file
 */
function copyTestTemplate(version, featureName) {
  let targetFolder = TEST_SPECIFICATION_FOLDER_NAME;
  let arrPath = [];
  arrPath.push(version);
  arrPath.push(featureName);
  arrPath.push(targetFolder);

  return copyTemplate(TEMPLATE_TEST_ID, arrPath);
}

function copyTemplate(templateId, arrPath) {
  // output folder
  let outputFolder = createFolderForTemplateFile(arrPath);

  return copyFile(templateId, outputFolder);
}

/**
 * Returns the URL of the file generated by copying
 */
function copyFile(fileId, folder) {
  // template file
  let file = DriveApp.getFileById(fileId);
  let newFileName = file.getName() + "_copy";

  let dest = findFileIn(folder, newFileName);
  if (dest === undefined) {
    file.makeCopy(newFileName, folder);
  }

  let newFile = findFileIn(folder, newFileName);
  if (newFile !== undefined) {
    return newFile.getUrl();
  }

  return "";
}
