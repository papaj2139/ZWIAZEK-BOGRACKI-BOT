const axios = require('axios');

module.exports = {
  name: 'kot',
  description: 'Wyświetla losowe zdjęcie kota.',
  execute(message) {
    axios.get('https://api.thecatapi.com/v1/images/search')
      .then((response) => {
        const catUrl = response.data[0].url;
        message.channel.send(catUrl);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania zdjęcia kota:', error);
        message.reply('Wystąpił błąd podczas pobierania zdjęcia kota. Spróbuj ponownie później.');
      });
  },
};
