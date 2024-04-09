const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("calc")
    .setDescription("Irei calcular uma expressão aritmética")
    .addStringOption((option) =>
      option
        .setName("expressão")
        .setDescription("Irei calcular a expressão que você escrever aqui")
        .setRequired(true)
    ),
  async execute(interaction) {
    const getExpression = interaction.options.getString("expressão");
    if (typeof getExpression !== "string") {
      await interaction.reply("Forneça uma expressão aritmética válida!");
    }
    try {
      const result = eval(getExpression);
      await interaction.reply(`O resultado é ${result}`);
    } catch (err) {
      await interaction.reply("Ocorreu um erro ao calcurar a expressão");
    }
  },
};
