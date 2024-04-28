const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roll")
    .setDescription(
      "Ao usar esse comando, o bot irá girar um dado de 1 até um determinado número."
    )
    .addIntegerOption((option) =>
      option
        .setName("number")
        .setDescription("Até qual número irá o dado?")
        .setRequired(true)
    ),
  async execute(interaction) {
    const number = interaction.options.getInteger("number");
    const reply = await interaction.reply({ content: "🎲 Girando..." });
    const randomNumber = Math.floor(Math.random() * number);

    setTimeout(async () => {
      await reply.edit(`🤓 Girei o dado e deu ${randomNumber}`);
    }, 1000);
  },
};
