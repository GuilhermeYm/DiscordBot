const fs = require("fs");
const path = require("path");
const filePath = path.resolve(__dirname, "..", "..", "..", "db.json");

const content = () => {
  try {
    const contentJSON = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(contentJSON);
    return json;
  } catch (err) {
    console.error(`Erro na hora de ler o arquivo json. Erro: ${err}`);
    return null;
  }
};

module.exports = { content };
