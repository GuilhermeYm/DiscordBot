const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription("Irá mostrar todas as informações do comando"),
  async execute(interaction) {
    const guild = interaction.guild;
    await guild.channels.fetch();
    console.log(guild.memberCount);

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
          value: guild.memberCount.toString(),
          inline: true,
        },
        {
          name: "Cargos",
          value: guild.roles.cache.size.toString(),
          inline: true,
        }
      )
      .setImage(guild.iconURL({ size: 256, dynamic: true }))
      .setTimestamp();

    const button = new ButtonBuilder()
      .setCustomId("showRolesButton")
      .setLabel("Mostrar Cargos")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await interaction.reply({ embeds: [serverInfoEmbed], components: [row] });
    const filter = (i) =>
      i.customId === "showRolesButton" && i.user.id === interaction.user.id;

    const collector = interaction.channel.createMessageComponentCollector({
      filter,
      time: 15000,
    });

    collector.on("collect", async (i) => {
      await i.reply(rolesList);
    });

    collector.on("end", async (collected, reason) => {
      if (reason === "time") {
        await interaction.followUp("O tempo para selecionar um botão esgotou.");
      }
    });
  },
};
