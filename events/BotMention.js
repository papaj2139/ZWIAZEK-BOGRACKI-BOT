const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'messageCreate',
  execute(message, client) {
    if (message.mentions.has(client.user) && !message.author.bot) {
      const embed = new MessageEmbed()
        .setTitle('Cześć!')
        .setDescription(`Mój prefix to \`z!\`. Wpisz \`z!help\`, aby zobaczyć dostępne komendy.`)
        .setColor('#00ff00'); 

      message.channel.send({ embeds: [embed] });
    }
  },
};
