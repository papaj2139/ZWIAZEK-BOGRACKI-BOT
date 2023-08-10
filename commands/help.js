const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'help',
  description: 'Wyświetla dostępne komendy.',
  async execute(message, args, commands, prefix) {
    const pageSize = 10; 
    const commandList = Array.from(commands.values());

    const totalPages = Math.ceil(commandList.length / pageSize);

    const page = args[0] || 1;

    if (page < 1 || page > totalPages || isNaN(page)) {
      return message.reply(`Nieprawidłowa strona. Wpisz \`${prefix}help [numer strony]\`, aby zobaczyć inne strony.`);
    }

    const startIdx = (page - 1) * pageSize;
    const endIdx = startIdx + pageSize;

    const embed = new MessageEmbed()
      .setColor('#3498db')
      .setTitle('Lista komend')
      .setDescription(
        commandList
          .slice(startIdx, endIdx)
          .map(command => `**${command.name}**: ${command.description}`)
          .join('\n')
      )
      .setFooter(`Strona ${page} z ${totalPages}`);

    const sentEmbed = await message.channel.send({ embeds: [embed] });

    if (totalPages > 1) {
      await sentEmbed.react('⬅️');
      await sentEmbed.react('➡️');

      const filter = (reaction, user) => ['⬅️', '➡️'].includes(reaction.emoji.name) && user.id === message.author.id;
      const collector = sentEmbed.createReactionCollector({ filter, time: 30000 });

      collector.on('collect', async (reaction) => {
        reaction.users.remove(message.author);

        if (reaction.emoji.name === '⬅️') {
          const prevPage = page - 1;
          if (prevPage >= 1) {
            await sentEmbed.reactions.removeAll();
            sendEmbed(sentEmbed, prevPage, commands, prefix);
          }
        } else if (reaction.emoji.name === '➡️') {
          const nextPage = page + 1;
          if (nextPage <= totalPages) {
            await sentEmbed.reactions.removeAll();
            sendEmbed(sentEmbed, nextPage, commands, prefix);
          }
        }
      });

      collector.on('end', async () => {
        await sentEmbed.reactions.removeAll().catch(error => console.error('Nie można usunąć reakcji:', error));
      });
    }
  },
};

async function sendEmbed(sentEmbed, pageNumber, commands, prefix) {
  const pageSize = 10; 
  const commandList = Array.from(commands.values());
  const totalPages = Math.ceil(commandList.length / pageSize);

  const newStartIdx = (pageNumber - 1) * pageSize;
  const newEndIdx = newStartIdx + pageSize;

  const embed = new MessageEmbed()
    .setColor('#3498db')
    .setTitle('Lista komend')
    .setDescription(
      commandList
        .slice(newStartIdx, newEndIdx)
        .map(command => `**${command.name}**: ${command.description}`)
        .join('\n')
    )
    .setFooter(`Strona ${pageNumber} z ${totalPages}`);

  sentEmbed.edit({ embeds: [embed] });

  if (totalPages > 1) {
    sentEmbed.react('⬅️');
    sentEmbed.react('➡️');
  }
}
