const { SlashCommandBuilder, PermissionFlagsBits} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("clear")
    .setDescription("Esse comando irá limpar o chat")
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageMessages)
    .addIntegerOption((option) =>
      option
        .setName("quantidade")
        .setDescription(
          "Insirá a quantidade de palavras que você quer que eu limpe. Maior que um e menor que 100"
        )
        .setRequired(true)
    ),
    async execute(interaction){
      const amount = interaction.options.getInteger("quantidade")
    
      if(isNaN(amount) || amount > 100 || amount <= 0) { 
        await interaction.reply("Por favor, insira um valor menor ou igual a cem, além disso insira um número maior que 0")
      }
      try {
        const messages = await interaction.channel.messages.fetch({limit: amount + 1})
        await interaction.channel.bulkDelete(messages, true)
        await interaction.reply(`Pronto, apaguei ${amount} mensagens!`)

      }catch (err) { 
        console.log(err)
        await interaction.reply("Deu algum erro! Reporte para o desenvolvedor!")
      }
    }
};
