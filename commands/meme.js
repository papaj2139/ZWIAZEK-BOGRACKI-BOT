const axios = require('axios');

module.exports = {
  name: 'meme',
  description: 'Wyświetla losowy mem.',
  execute(message) {
    axios.get('https://api.reddit.com/r/memes/random')
      .then((response) => {
        const memeUrl = response.data[0].data.children[0].data.url;
        message.channel.send(memeUrl);
      })
      .catch((error) => {
        console.error('Błąd podczas pobierania mema:', error);
        message.reply('Wystąpił błąd podczas pobierania mema. Spróbuj ponownie później.');
      });
  },
};
