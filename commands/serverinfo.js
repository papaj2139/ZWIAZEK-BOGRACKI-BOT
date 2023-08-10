const { MessageEmbed } = require('discord.js');
const moment = require('moment');

module.exports = {
  name: 'serverinfo',
  description: 'Wyświetla szczegółowe informacje o serwerze.',
  execute(message, args) {
    const server = message.guild;

    // Funkcja pomocnicza do sprawdzania i konwersji wartości na łańcuch znaków
    function stringify(value) {
      if (typeof value === 'string') {
        return value;
      } else if (typeof value === 'object') {
        return JSON.stringify(value);
      } else {
        return String(value);
      }
    }

    const serverInfoEmbed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Informacje o Serwerze')
      .addFields(
        { name: 'Nazwa', value: stringify(server.name), inline: true },
        { name: 'ID', value: stringify(server.id), inline: true },
        { name: 'Właściciel', value: stringify(server.owner ? server.owner.user.tag : 'Nieznany właściciel'), inline: true },
        { name: 'Liczba Członków', value: stringify(server.memberCount), inline: true },
        { name: 'Region', value: stringify(server.region), inline: true },
        { name: 'Poziom Weryfikacji', value: stringify(server.verificationLevel), inline: true },
        { name: 'Data Utworzenia Serwera', value: stringify(moment(server.createdAt).format('DD.MM.YYYY, HH:mm:ss')), inline: true },
        { name: 'Data Dołączenia Bota', value: stringify(moment(server.joinedAt).format('DD.MM.YYYY, HH:mm:ss')), inline: true },
        { name: 'Liczba Kanałów Tekstowych', value: stringify(server.channels.cache.filter(channel => channel.type === 'GUILD_TEXT').size), inline: true },
        { name: 'Liczba Kanałów Głosowych', value: stringify(server.channels.cache.filter(channel => channel.type === 'GUILD_VOICE').size), inline: true }
      )
      .setThumbnail(server.iconURL({ dynamic: true }))
      .setTimestamp();

    message.channel.send({ embeds: [serverInfoEmbed] });
  },
};
