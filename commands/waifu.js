module.exports = {
    name: 'waifu',
    description: 'Wysyła losowe zdjęcie waifu z WaifuBot API.',
    async execute(message) {
      try {
        const { default: fetch } = await import('node-fetch');
        const response = await fetch('https://api.waifu.pics/sfw/waifu');
        const data = await response.json();
  
        if (!data || !data.url) {
          return message.reply('Nie udało się pobrać zdjęcia waifu. Spróbuj ponownie później.');
        }
  
        const { url } = data;
        message.channel.send(url);
      } catch (error) {
        console.error('Błąd podczas pobierania zdjęcia waifu:', error);
        message.reply('Wystąpił błąd podczas pobierania zdjęcia waifu. Spróbuj ponownie później.');
      }
    },
  };
  