const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'botinfo',
  description: 'Wyświetla informacje o bocie.',
  execute(message, args, bot) {
    const autorBota = 'lubieamongusa amongas';
    const wersjaBota = '1.2.0';
    const wersjaBiblioteki = 'v13 (discord.js)';
    const czasDzialania = czasDzialaniaBota(bot);

    const embed = new MessageEmbed()
      .setColor('#3498db')
      .setTitle('Informacje o Bocie')
      .addField('Autor Bota', autorBota)
      .addField('Wersja Bota', wersjaBota)
      .addField('Wersja Biblioteki', wersjaBiblioteki)
      .addField('Czas Działania', czasDzialania)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  },
};

function czasDzialaniaBota(bot) {
  const calkowiteMilisekundy = bot.uptime;
  const milisekundy = calkowiteMilisekundy % 1000;
  const calkowiteSekundy = (calkowiteMilisekundy - milisekundy) / 1000;
  const dni = Math.floor(calkowiteSekundy / 86400);
  const godziny = Math.floor((calkowiteSekundy % 86400) / 3600);
  const minuty = Math.floor((calkowiteSekundy % 3600) / 60);
  const sekundy = Math.floor(calkowiteSekundy % 60);
  return `${dni} dni, ${godziny} godzin, ${minuty} minut, ${sekundy} sekund`;
}
