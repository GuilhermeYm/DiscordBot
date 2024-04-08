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
  async execute(interection) {
    const getExpression = interection.options.getNumber("expressão");
    if (typeof getExpression !== "string") {
      await interection.reply("Forneça uma expressão aritmética válida!");
    }
    try {
        const result = eval(getExpression)
        await interection.reply(`O resultado é ${result}`)
    } catch(err){
        await interection.reply("Ocorreu um erro ao calcurar a expressão")
    }
  },
};
