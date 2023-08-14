module.exports = {
    name: 'liczba',
    description: 'Generuje losową liczbę w podanym zakresie.',
    execute(message, args) {
      if (args.length !== 2) {
        return message.reply('Użycie: !liczba <minimalna liczba> <maksymalna liczba>');
      }
  
      const min = parseInt(args[0]);
      const max = parseInt(args[1]);
  
      if (isNaN(min) || isNaN(max)) {
        return message.reply('Podaj poprawne liczby.');
      }
  
      if (min >= max) {
        return message.reply('Minimalna liczba musi być mniejsza od maksymalnej liczby.');
      }
  
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  
      message.channel.send(`Wylosowana liczba: ${randomNumber}`);
    },
  };
  