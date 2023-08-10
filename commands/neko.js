module.exports = {
    name: 'neko',
    description: 'Wysyła losowe zdjęcie neko z NekoBot API.',
    async execute(message) {
      try {
        const { default: fetch } = await import('node-fetch');
  
        const response = await fetch('https://nekos.life/api/v2/img/neko');
        const data = await response.json();
  
        if (!data || !data.url) {
          return message.reply('Nie udało się pobrać zdjęcia neko. Spróbuj ponownie później.');
        }
  
        const { url } = data;
        message.channel.send(url);
      } catch (error) {
        console.error('Błąd podczas pobierania zdjęcia neko:', error);
        message.reply('Wystąpił błąd podczas pobierania zdjęcia neko. Spróbuj ponownie później.');
      }
    },
  };
  