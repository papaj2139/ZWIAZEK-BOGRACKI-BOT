const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'ban',
  description: 'Banuje użytkownika z serwera.',
  execute(message, args) {
    if (!message.member.permissions.has("BAN_MEMBERS")) {
      return message.reply('Nie masz uprawnień do banowania użytkowników.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Nie oznaczyłeś użytkownika, którego chcesz zbanować.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('Nie można znaleźć użytkownika na tym serwerze.');
    }

    if (!member.bannable) {
      return message.reply('Nie można zbanować tego użytkownika.');
    }

    const reason = args.slice(1).join(' ') || 'Brak podanego powodu';

    member.ban({ reason })
      .then(() => {
        const banEmbed = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Użytkownik Zbanowany')
          .setDescription(`${user.tag} został zbanowany z serwera.`)
          .addField('Powód', reason)
          .addField('Moderator', message.author.tag)
          .setTimestamp();

        message.channel.send({ embeds: [banEmbed] });
      })
      .catch((error) => {
        console.error('Wystąpił błąd podczas banowania użytkownika:', error);
        message.reply('Wystąpił błąd podczas banowania użytkownika.');
      });
  },
};
