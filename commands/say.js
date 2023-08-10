module.exports = {
    name: 'say',
    description: 'Powtarza wiadomość autora komendy.',
    execute(message, args) {
      const reply = args.join(' ');
      message.channel.send(reply);
    },
  };
  