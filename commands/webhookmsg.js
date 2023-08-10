const { WebhookClient, MessageEmbed } = require('discord.js');

module.exports = {
  name: 'webhookmsg',
  description: 'Wysyła wiadomość przy użyciu webhooka.',
  async execute(message, args) {
    if (args.length < 2) {
      return message.reply('Użyj komendy w formacie: !webhookmsg <link webhooka> <wiadomość>');
    }

    const webhookLink = args[0];
    const msgContent = args.slice(1).join(' ');

    try {
      const webhookClient = new WebhookClient({ url: webhookLink });
      await webhookClient.send(msgContent);
      message.reply('Wiadomość została wysłana przy użyciu webhooka.');
    } catch (error) {
      console.error('Błąd podczas wysyłania wiadomości:', error);
      return message.reply('Wystąpił błąd podczas wysyłania wiadomości. Upewnij się, że podałeś poprawny link webhooka.');
    }
  },
};
