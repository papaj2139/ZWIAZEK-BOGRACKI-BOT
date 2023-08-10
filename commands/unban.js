module.exports = {
    name: 'unban',
    description: 'Odbanuj użytkownika po podaniu jego ID.',
    execute(message, args) {
      if (!message.member.permissions.has('BAN_MEMBERS')) {
        return message.reply("Nie masz uprawnień do odbanowywania użytkowników.");
      }
  
      const userId = args[0];
      if (!userId) {
        return message.reply("Podaj ID osoby, którą chcesz odbanować.");
      }
  
      message.guild.fetchBans().then((bans) => {
        const user = bans.find((ban) => ban.user.id === userId);
        if (user) {
          message.guild.members.unban(user.user);
          return message.reply(`Użytkownik o ID ${userId} został odbanowany.`);
        } else {
          return message.reply("Nie znaleziono użytkownika o tym ID na liście banów.");
        }
      }).catch((error) => {
        console.error("Błąd podczas próby odbanowania użytkownika:", error);
        return message.reply("Wystąpił błąd podczas odbanowywania użytkownika. Spróbuj ponownie później.");
      });
    },
  };
  