const fs = require('fs');

module.exports = {
  name: 'reload',
  description: 'Przeładowuje wszystkie komendy bota.',
  execute(message, args) {
    // Sprawdzamy, czy użytkownik wywołujący komendę jest właścicielem bota (o określonym ID)
    if (message.author.id !== '785878428913106985') {
      return message.reply('Nie masz uprawnień do używania tej komendy.');
    }

    // Usuwamy cache komend z folderu 'commands'
    try {
      fs.readdirSync('./commands').forEach(file => {
        if (file.endsWith('.js')) {
          delete require.cache[require.resolve(`./${file}`)];
        }
      });
      message.reply('Komendy zostały przeładowane.');
    } catch (error) {
      console.error('Wystąpił błąd podczas przeładowywania komend:', error);
      message.reply('Wystąpił błąd podczas przeładowywania komend.');
    }
  },
};
