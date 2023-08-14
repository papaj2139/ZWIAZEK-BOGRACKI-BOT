module.exports = {
    name: 'ankieta',
    description: 'Tworzy ankietę na serwerze.',
    execute(message, args) {
      if (args.length < 3) {
        return message.reply('Użycie: !ankieta <pytanie> <opcja 1> <opcja 2> ...');
      }
  
      const question = args[0];
      const options = args.slice(1);
  
      const optionsString = options.map((option, index) => `${index + 1}. ${option}`).join('\n');
  
      const pollEmbed = {
        color: '#3498db',
        title: 'Ankieta',
        description: question,
        fields: [{ name: 'Opcje', value: optionsString }],
        footer: { text: 'Reaguj na tę wiadomość, aby zagłosować.' },
      };
  
      message.channel.send({ embeds: [pollEmbed] }).then(sentEmbed => {
        options.forEach((_, index) => {
          sentEmbed.react(getNumberEmoji(index + 1));
        });
      });
    },
  };
  
  function getNumberEmoji(number) {
    const numberEmojiMap = {
      1: '1️⃣',
      2: '2️⃣',
      3: '3️⃣',
      4: '4️⃣',
      5: '5️⃣',
      6: '6️⃣',
      7: '7️⃣',
      8: '8️⃣',
      9: '9️⃣',
      10: '🔟',
    };
    return numberEmojiMap[number] || '';
  }
  