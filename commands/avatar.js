const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'avatar',
  description: 'Pokaż twój awatar lub kogoś.',
  execute(message, args) {
    const user = message.mentions.users.first() || message.author;

    const embed = new MessageEmbed()
      .setColor('#3498db')
      .setTitle(`${user.tag} Awatar`)
      .setImage(user.displayAvatarURL({ dynamic: true, size: 4096 }));

    message.channel.send({ embeds: [embed] });
  },
};
