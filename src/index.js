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

client.commands = new Collection()

for (const file of commandFile) {
  const filePath = path.join(commandsPath, file);
  const command = require(filePath)
  if ("data" in command && "execute" in command){ 
    client.commands.set(command.data.name, command)
  } else {
    console.log(`Esse comando em ${filePath} está com "data" ou "execute" ausente!`)
  }
}

client.on("ready", (c) => {
  console.log(`✅ O bot está pronto. Name: ${c.user.tag}`);

  let random = Math.floor(Math.random() * status.length);
  client.user.setActivity(status[random]);

  console.log(client.commands)
});

client.on(Events.InteractionCreate, async interaction =>{
  if (interaction.isStringSelectMenu()){
      const selected = interaction.values[0]
      if (selected == "javascript"){
          await interaction.reply("Documentação do Javascript: https://developer.mozilla.org/en-US/docs/Web/JavaScript")
      } else if (selected == "python"){
          await interaction.reply("Documentação do Python: https://www.python.org")
      } else if (selected == "csharp"){
          await interaction.reply("Documentação do C#: https://learn.microsoft.com/en-us/dotnet/csharp/")
      } else if (selected == "discordjs"){
          await interaction.reply("Documentação do Discord.js: https://discordjs.guide/#before-you-begin")
      }
  }
  if (!interaction.isChatInputCommand()) return
  const command = interaction.client.commands.get(interaction.commandName)
  if (!command) {
      console.error("Comando não encontrado")
      return
  }
  try {
      await command.execute(interaction)
  } 
  catch (error) {
      console.error(error)
      await interaction.reply("Houve um erro ao executar esse comando!")
  }
})

client.login(process.env.TOKEN);
