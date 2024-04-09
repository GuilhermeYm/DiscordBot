const { Client, IntentsBitField, Collection, Events } = require("discord.js");
const fs = require("fs");
const path = require("path");
require("module-alias/register");
require("dotenv").config();
const commandsPath = path.join(__dirname, "commands");
const commandFile = fs
  .readdirSync(commandsPath)
  .filter((file) => file.endsWith(".js"));
const { status } = require("./assets/status");

console.log(commandFile);

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.MessageContent,
  ],
});

client.commands = new Collection();

const loadCommands = (dir) => {
  const files = fs.readdirSync(dir);

  for (const file of files) {
    const filePath = path.join(dir, file);
    const stat = fs.lstatSync(filePath);

    if (stat.isDirectory()) {
      loadCommands(filePath);
    } else if (file.endsWith(".js")) {
      const command = require(filePath);
      try {
        client.commands.set(command.data.name, command);
      } catch (err) {
        console.log(command);
        console.error(err);
      }
    }
  } 
};

loadCommands(commandsPath);

// for (const file of commandFile) {
//   const filePath = path.join(commandsPath, file);
//   const command = require(filePath);
//   if ("data" in command && "execute" in command) {
//     client.commands.set(command.data.name, command);
//   } else {
//     console.log(
//       `Esse comando em ${filePath} está com "data" ou "execute" ausente!`
//     );
//   }
// }

client.on("ready", (c) => {
  console.log(`✅ O bot está pronto. Name: ${c.user.tag}`);

  let random = Math.floor(Math.random() * status.length);
  client.user.setActivity(status[random]);

  console.log(client.commands);
});

client.login(process.env.TOKEN);

client.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;
  const command = interaction.client.commands.get(interaction.commandName);
  if (!command) {
    console.error("Comando não encontrado");
    return;
  }
  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply("Houve um erro ao executar esse comando!");
  }
});
