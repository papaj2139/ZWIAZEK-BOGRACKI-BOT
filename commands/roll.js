module.exports = {
    name: 'roll',
    description: 'Rzuca kością o podanej liczbie ścianek.',
    execute(message, args) {
      const sides = parseInt(args[0]);
      if (isNaN(sides) || sides < 1) {
        return message.reply('Podaj poprawną liczbę ścianek (większą od 0).');
      }
  
      const rollResult = Math.floor(Math.random() * sides) + 1;
      message.channel.send(`Wyrzuciłeś/aś ${rollResult} na ${sides}-ściennych kostkach.`);
    },
  };
  