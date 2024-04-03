const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Vê se o bot está on ou off!"),

  async execute(interaction, ) {
    const startTime = Date.now()
    const reply = await interaction.reply({content: "🧠 Medindo...", fetchReply: true})
    const endTime = Date.now()

    const ping = endTime - startTime
    const botPing = interaction.client.ws.ping 
    
    await reply.edit(`🤓 Pong! A latência do bot é de ${botPing} ms`);
  },
};
