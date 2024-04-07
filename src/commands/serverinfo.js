const {
  SlashCommandBuilder,
  EmbedBuilder,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Irá mostrar todas as informações do comando"),
  async execute(interaction) {
    const guild = interaction.guild;
    await guild.channels.fetch();

    const rolesList = guild.roles.cache
      .map((role) => `${role.name}`)
      .join("\n");

    const serverInfoEmbed = new EmbedBuilder()
      .setAuthor({
        name: guild.name,
        iconURL: guild.iconURL({ size: 256 }),
      })
      .addFields(
        {
          name: "Dono",
          value: (await guild.fetchOwner()).user.username,
          inline: true,
        },
        {
          name: "Canais de texto",
          value: guild.channels.cache
            .filter((c) => c.type === 0)
            .size.toString(),
          inline: true,
        },
        {
          name: "Canais de Voz",
          value: guild.channels.cache
            .filter((c) => c.type === 2)
            .size.toString(),
          inline: true,
        },
        {
          name: "Membros",
          value: guild.memberCount,
          inline: true,
        },
        {
          name: "Cargos",
          value: guild.roles.cache.size,
          inline: true,
        }
      );

    const viewRolesButton = new MessageButton()
      .setCustomId("view_roles")
      .setLabel("Ver cargos")
      .setStyle("PRIMARY");

    const row = new MessageActionRow().addComponents(viewRolesButton);

    await interaction.reply({ embeds: [serverInfoEmbed], components: [row] });
  },
};
