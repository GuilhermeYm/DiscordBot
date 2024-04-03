const { REST, Routes } = require("discord.js");

const fs = require("fs");
const path = require("path");
const commandsPath = path.join(__dirname, "..", "..", "commands");
const commandFiles = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));

const dotEnvPath = path.join(__dirname, "..", "..", "..", ".env");

const dotenv = require("dotenv");
dotenv.config({ path: dotEnvPath });
const { TOKEN, CLIENT_ID } = process.env;

const commands = [];

for (const file of commandFiles) {
  const command = require(`${commandsPath}/${file}`);
  commands.push(command.data.toJSON());
}

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
