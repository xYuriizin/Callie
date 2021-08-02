const client = require('../index')
const { Collection } = require('discord.js')
const firebase = require('firebase')
const database = firebase.database()
const moment = require('moment')

client.on('message', async message => {
    if (message.author.bot) return;

    var prefixref = database.ref(`prefixos/servidores/${message.guild.id}`)
    var prefixdb = await prefixref.once('value')
    let prefix;
    if(prefixdb.val() === null) {
      prefixref.set({
        prefix: '\''
      })
      prefix = '\''
    } else {
      prefix = prefixdb.val().prefix
    }

    const moneyref = database.ref(`economia/${message.author.id}`)
    const moneydb = await moneyref.once('value')
    if(moneydb.val() === null) {
        moneyref.update({
            money: 0
        })
    }
  
    if (message.content === `<@${client.user.id}>` || message.content === `<@!${client.user.id}>`) return message.channel.send(`${message.author} Meu prefixo é **${prefix}** use **${prefix}help** para mais ajuda!`)
    if (!message.content.startsWith(prefix)) return;
    if (!message.guild) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    if (cmd.length == 0) return;
    let command = client.commands.get(cmd)
    if (!command) command = client.commands.get(client.aliases.get(cmd));
    if (command) command.run(client, message, args)
  })