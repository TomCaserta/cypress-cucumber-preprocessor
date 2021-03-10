const cucumber = require("cypress-cucumber-preprocessor").default; // eslint-disable-line
const { getCucumberTasks } = require("cypress-cucumber-preprocessor/lib/tasks"); // eslint-disable-line

module.exports = (on) => {
  on("task", {
    ...getCucumberTasks(),
  });

  on("file:preprocessor", cucumber());
};
