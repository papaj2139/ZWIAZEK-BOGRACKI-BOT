module.exports = {
    name: 'wyczyść',
    description: 'Usuwa określoną liczbę wiadomości.',
    args: true,
    usage: '<liczba>',
    execute(message, args) {
      const amount = parseInt(args[0]);
  
      if (isNaN(amount)) {
        return message.reply('Podaj poprawną liczbę wiadomości do usunięcia.');
      } else if (amount <= 0 || amount > 100) {
        return message.reply('Podaj liczbę między 1 a 100.');
      }
  
      message.channel.bulkDelete(amount, true).catch(error => {
        console.error('Błąd podczas usuwania wiadomości:', error);
        message.reply('Wystąpił błąd podczas usuwania wiadomości.');
      });
    },
  };
  