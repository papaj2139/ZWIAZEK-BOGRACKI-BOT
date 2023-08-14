const zakazaneSlowa = ['kurwa', 'pierdole', 'chuj', 'kutas', 'jebany', 'skurwysyn'];
const idRoli = '1121770154246819950';

module.exports = {
  name: 'messageCreate',
  execute(wiadomosc) {
    if (wiadomosc.author.bot) return; 

    const tresc = wiadomosc.content.toLowerCase(); 

    
    if (zakazaneSlowa.some((slowo) => tresc.includes(slowo))) {
      const rola = wiadomosc.guild.roles.cache.get(idRoli);
      if (!rola) {
        console.error(`Nie znaleziono roli o ID ${idRoli}.`);
        return;
      }

     
      const autor = wiadomosc.member;
      if (autor) {
        autor.roles.add(rola)
          .then(() => {
            console.log(`Dodano rolę ${rola.name} dla użytkownika ${autor.user.tag}.`);
          })
          .catch((error) => {
            console.error('Błąd podczas dodawania roli:', error);
          });
      }
    }
  },
};
