const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'kick',
  description: 'Wyrzuca użytkownika z serwera.',
  execute(message, args) {
    if (!message.member.permissions.has("KICK_MEMBERS")) {
      return message.reply('Nie masz uprawnień do wyrzucania użytkowników.');
    }

    const user = message.mentions.users.first();
    if (!user) {
      return message.reply('Nie oznaczyłeś użytkownika, którego chcesz wyrzucić.');
    }

    const member = message.guild.members.cache.get(user.id);
    if (!member) {
      return message.reply('Nie można znaleźć użytkownika na tym serwerze.');
    }

    if (!member.kickable) {
      return message.reply('Nie można wyrzucić tego użytkownika.');
    }

    const reason = args.slice(1).join(' ') || 'Brak podanego powodu';

    member.kick(reason)
      .then(() => {
        const kickEmbed = new MessageEmbed()
          .setColor('#ff0000')
          .setTitle('Użytkownik Wyrzucony')
          .setDescription(`${user.tag} został wyrzucony z serwera.`)
          .addField('Powód', reason)
          .addField('Moderator', message.author.tag)
          .setTimestamp();

        message.channel.send({ embeds: [kickEmbed] });
      })
      .catch((error) => {
        console.error('Wystąpił błąd podczas wyrzucania użytkownika:', error);
        message.reply('Wystąpił błąd podczas wyrzucania użytkownika.');
      });
  },
};
