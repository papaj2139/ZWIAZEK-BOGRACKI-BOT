const { MessageEmbed } = require('discord.js');

module.exports = {
  name: '8ball',
  description: 'Magiczna kula nr 8 odpowiada na Twoje pytanie.',
  execute(message, args) {
    if (!args.length) {
      return message.reply('Musisz zadać pytanie, aby magiczna kula mogła odpowiedzieć.');
    }

    const responses = [
      'Zdecydowanie tak.',
      'Tak, na pewno.',
      'Zdecydowanie nie.',
      'Nie, raczej nie.',
      'Może być.',
      'Nie jestem pewien, spróbuj ponownie.',
      'Nie mogę odpowiedzieć w tej chwili.',
      'Skoncentruj się i zapytaj ponownie.',
      'Nie licz na to.',
      'Nie widzę przyszłości w tej kwestii.',
    ];

    const randomResponse = responses[Math.floor(Math.random() * responses.length)];

    const responseEmbed = new MessageEmbed()
      .setColor('#FF0000')
      .setTitle('Magiczna Kula Nr 8')
      .addField('Twoje pytanie', args.join(' '))
      .addField('Odpowiedź', randomResponse)
      .setTimestamp();

    message.channel.send({ embeds: [responseEmbed] });
  },
};
