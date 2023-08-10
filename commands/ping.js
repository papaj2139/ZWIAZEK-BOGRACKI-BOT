module.exports = {
    name: 'ping',
    description: 'Sprawdza opóźnienie bota (ping).',
    execute(message, args) {
      message.channel.send('Pinging...').then(sentMessage => {
        const ping = sentMessage.createdTimestamp - message.createdTimestamp;
        sentMessage.edit(`Pong! Opóźnienie wynosi ${ping} ms.`);
      }).catch(error => {
        console.error('Wystąpił błąd podczas wysyłania wiadomości:', error);
        message.reply('Wystąpił błąd podczas sprawdzania opóźnienia.');
      });
    },
  };
  