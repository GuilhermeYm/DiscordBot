const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const { content } = require("../../assets/utils/jsonContent");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("attack")
    .setDescription("Você quer atacar um cara? Use esse comando")
    .addMentionableOption((option) =>
      option
        .setName("user")
        .setDescription("Escreva o nome do cara que você quer atacar")
        .setRequired(true)
    ),
  async execute(interaction) {
    const user = interaction.options.getMentionable("user");
    const requestUser = interaction.member;

    const jsonCONTENT = content()
    const randomNumber = Math.floor(Math.random() * 3);
    const randomImage = jsonCONTENT[0].Attack[randomNumber].link;

    const embed = new EmbedBuilder()
      .setColor(0x000000)
      .setTitle("Ataque")
      .setDescription(`${requestUser} atacou ${user}`)
      .setImage(randomImage);

    await interaction.reply({ embeds: [embed] });
  },
};
