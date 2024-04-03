const { SlashCommandBuilder, ApplicationCommandOptionType } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("ban")
        .setDescription("Banir alguém do servidor")
        .addMentionableOption(option =>
            option.setName("alvo do ban")
                .setDescription("Quem você mencionar será banido")
                .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("Razão")
                .setDescription("Digite a razão do banimento")
        ),
    defaultPermission: false,
    permissions: [
        {
            id: 'BAN_MEMBERS',
            type: 'ROLE',
            permission: true,
        },
    ],
    
};
