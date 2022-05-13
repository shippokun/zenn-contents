const fs = require("fs");

module.exports = {
  helpers: {
    talkCount: () => {
      const files = fs.readdirSync(`${__dirname}/articles`);
      const talkList = files.filter((fileName) =>
        fileName.includes("frontend")
      );
      return talkList.length + 1;
    },
    today: () => {
      const day = new Date();
      return day.toISOString().match(/\d{4}\-\d{2}\-\d{2}/g)[0];
    },
  },
  templates: `${__dirname}/.hygen`,
};
