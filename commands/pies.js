const axios = require('axios');

module.exports = {
  name: 'pies',
  description: 'Wyświetla losowe zdjęcie psa.',
  execute(message) {
    axios.get('https://random.dog/woof.json')
      .then((response) => {
        const dogUrl = response.data.url;
        message.channel.send(dogUrl);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania zdjęcia psa:', error);
        message.reply('Wystąpił błąd podczas pobierania zdjęcia psa. Spróbuj ponownie później.');
      });
  },
};
