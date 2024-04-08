const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("useravatar")
    .setDescription("Esse comando irá mostrar a foto de usuário do alvo")
    .addUserOption((option) =>
      option
        .setName("alvo")
        .setDescription("Mostrá-ra o ícone da conta do alvo")
        .setRequired(true)
    ),
  async execute(interection, client) {
    const targetUser = interection.options.getUser("alvo");

    const userIconEmbed = new EmbedBuilder()
      .setColor(0x000000)
      .setTitle(`Foto de perfil do ${targetUser.username}`)
      .setImage(targetUser.displayAvatarURL({ dynamic: true, size: 256 }));

    await interection.reply({ embeds: [userIconEmbed] });
  },
};
