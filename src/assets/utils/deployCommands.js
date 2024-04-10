const { REST, Routes } = require("discord.js");

const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "..", "..", "commands");

const dotEnvPath = path.join(__dirname, "..", "..", "..", ".env");

const dotenv = require("dotenv");
dotenv.config({ path: dotEnvPath });
const { TOKEN, CLIENT_ID } = process.env;

const commands = [];

const loadCommands = (dir) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);

    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith(".js")) {
      const command = require(filePath);
      if (command.data) {
        commands.push(command.data.toJSON());
      } else {
        console.error(
          `O comando em ${filePath} não exporta um objeto com a propriedade 'data'.`
        );
      }
    }
  }
};

loadCommands(commandsPath);

const rest = new REST({ version: "10" }).setToken(TOKEN);

//  deploy
(async () => {
  try {
    console.log(`Resentando ${commands.length} comandos...`);

    console.log(commands);

    await rest.put(Routes.applicationCommands(CLIENT_ID), { body: commands });
    console.log("Comandos registrados com sucesso!");
  } catch (error) {
    console.error(error);
  }
})();
