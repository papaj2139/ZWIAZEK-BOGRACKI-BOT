module.exports = {
    name: 'moneta',
    description: 'Rzuca monetą (orzeł lub reszka).',
    execute(message) {
      const result = Math.random() < 0.5 ? 'Orzeł' : 'Reszka';
      message.channel.send(`Wyrzuciłeś/aś: ${result}!`);
    },
  };
  