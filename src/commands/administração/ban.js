const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Esse comando irá banir alguém do servidor")
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers)
    .addUserOption((option) =>
      option
        .setName("alvo")
        .setDescription("Quem você mencionar será banido")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option.setName("motivo").setDescription("Digite o motivo do banimento")
    ),
  async execute(interaction, client) {
    const targetUser = interaction.options.getUser("alvo");
    const targetMember = interaction.guild.members.cache.get(targetUser.id);
    const reason = interaction.options.getString("motivo") || "Não teve motivo";

    await interaction.deferReply();

    if (!interaction.member.permissions.has("BAN_MEMBERS")) { 
      await interaction.editReply("Você não tem permissão para banir membros.");
      return;
    }

    if (!targetMember) {
      await interaction.editReply(`Esse usuário não existe.`);
      return;
    }

    if (targetMember.id === interaction.guild.ownerId) {
      await interaction.editReply("Você não pode banir o dono do servidor!");
      return;
    }

    const targetUserRolePosition = targetMember.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;

    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "Você não pode banir esse usuário, porque o cargo dele é igual ou maior que o seu!"
      );
      return;
    }

    try {
      await targetMember.ban({ reason });
      await interaction.editReply(
        `Usuário ${targetUser.tag} foi banido por: ${reason}`
      );
    } catch (err) {
      console.error(err);
      await interaction.editReply("Ocorreu um erro ao banir o usuário.");
    }
  },
};
