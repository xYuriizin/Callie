const { MessageEmbed } = require("discord.js");
const { readdirSync, truncate } = require("fs");
const firebase = require('firebase')
const database = firebase.database()

module.exports = {
  name: "help",
  aliases : ['h'],
  description: "Shows all available bot commands.",
  run: async (client, message, args) => {

    var prefixref = database.ref(`prefixos/servidores/${message.guild.id}`)
    var prefixdb = await prefixref.once('value')
    var prefix = prefixdb.val().prefix

    if (!args[0]) {
      
      var utili = readdirSync('./commands/utilidades').map(a => a.replace('.js', '')).join(', ')
      var misc = readdirSync('./commands/misc').map(a => a.replace('.js', '')).join(', ')
      var adm = readdirSync('./commands/adm').map(a => a.replace('.js', '')).join(', ')
      var diver = readdirSync('./commands/diver').map(a => a.replace('.js', '')).join(', ')

      const embed = new MessageEmbed()
      .setTitle(`**Ajuda - ${client.user.username}**`)
      .setDescription(`> Use \`${prefix}help <nome_de_algum_comando>\` para mais informações sobre o comando!`)
      .addField(`**Informações**`, `\`${utili}\``)
      .addField(`**Miscelânea**`, `\`${misc}\``)
      .addField(`**Moderação**`, `\`${adm}\``)
      .addField(`**Diversão**`, `> **OBS:** Os comandos de diversão ainda estão sendo feitos, então alguns podem conter bugs/erros que resolverei futuramente! \n\`${diver}\``)
      .setColor('PURPLE')
      .setTimestamp()
      .setThumbnail(message.author.displayAvatarURL({dynamic: true}))

      message.channel.send(message.author, embed)

    } else {
      const command =
        client.commands.get(args[0].toLowerCase()) ||
        client.commands.find(
          (c) => c.aliases && c.aliases.includes(args[0].toLowerCase())
        );

      if (!command) {
        return message.channel.send(`${message.author}, Comando inexistente!`);
      }

      const embed = new MessageEmbed()
        .setTitle("**Detalhes do comando!**")
        .addField(
          "**Aliases**",
          command.aliases
            ? `\`${command.aliases.join("` `")}\``
            : "Comando não possui aliases",
            true
        )
        .addField(
          "**Uso correto**",
          command.usage
            ? `\`${prefix}${command.name} ${command.usage}\``
            : `\`${prefix}${command.name}\``,
            true
        )
        .addField(
          "**Descrição**",
          command.description
            ? command.description
            : "Comando não possui descrição",
            true
        )
        .setFooter(
          `Pedido por: ${message.author.tag}`,
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setTimestamp()
        .setColor('PURPLE');
      return message.channel.send(message.author, embed);
    }
  },
};
