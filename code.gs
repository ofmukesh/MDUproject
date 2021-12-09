function doGet() {
  return HtmlService.createTemplateFromFile('index').evaluate().addMetaTag('viewport', 'width=device-width, initial-scale=1');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent()
}

function getFilesData(subject) {
  var ss = SpreadsheetApp.openById('1OCQNx1zWCUzlr7taajMxroXf4HYlZiEpXQS7t-OAq5w').getSheetByName(subject)
  var data = ss.getRange(2, 1, ss.getLastRow() - 1, 5).getValues();
  var Data = [subject, data]
  console.log(data)
  return Data
}

function getPdfBlob(id) {
  const file = DriveApp.getFileById(id)
  const blob = file.getBlob()
  const bytes = blob.getBytes()
  const b64 = Utilities.base64Encode(bytes)
  const data = [file.getName(), b64]
  return data
}

function uploadFileToGoogleDrive(data, file, name) {
  Logger.log("uploadFileToGoogleDrive", file, name)
  try {
    var folder = DriveApp.getFolderById('1RPfrzeApHrH4A23Ay7uSsVWJsdjXYp7y');
    var contentType = data.substring(5, data.indexOf(';')),
      bytes = Utilities.base64Decode(data.substr(data.indexOf('base64,') + 7)),
      blob = Utilities.newBlob(bytes, contentType, file),
      file = folder.createFile(blob);

    var id = file.getId();
    return id;

  } catch (f) {
    return f.toString();
  }
}

function dataUp(data) {
  var ss = SpreadsheetApp.openById('1OCQNx1zWCUzlr7taajMxroXf4HYlZiEpXQS7t-OAq5w').getSheetByName(data[1][0])
  ss.getRange(ss.getLastRow() + 1, 1, 1, 5).setValues([data[0]])
}

