const { writeFile: writeFileOld } = require("fs");
const { promisify } = require("util");
const { generateCucumberJson } = require("./cukejson/generateCucumberJson");
const { getCucumberJsonConfig } = require("./getCucumberJsonConfig");

const writeFile = promisify(writeFileOld);

const cleanupFilename = (s) => s.split(".")[0];

const writeCucumberJsonFile = (json) => {
  const config = getCucumberJsonConfig();
  const outputFolder = config.outputFolder || "cypress/cucumber-json";
  const outputPrefix = config.filePrefix || "";
  const outputSuffix = config.fileSuffix || ".cucumber";
  const fileName = json[0] ? cleanupFilename(json[0].uri) : "empty";
  const outFile = `${outputFolder}/${outputPrefix}${fileName}${outputSuffix}.json`;

  return writeFile(outFile, json);
};

function generateCucumberJsonTask(testState) {
  const json = generateCucumberJson(testState);

  // Return null so task is 'successful'
  return writeCucumberJsonFile(json).then(() => null);
}

function getCucumberTasks() {
  return {
    generateCucumberJson: generateCucumberJsonTask,
  };
}

module.exports = {
  getCucumberTasks,
};
