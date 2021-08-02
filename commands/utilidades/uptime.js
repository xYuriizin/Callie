const discord = require('discord.js');
const pms = require('pretty-ms')

module.exports = {
    name: 'up',
    aliases: ['up'], 
    description: 'Mostra há quanto tempo fui reiniciado pela última vez!',
    run: async(client, message, args) => {

      message.inlineReply(`${message.author} Estou online há **${pms(client.uptime)}**`)

    }
}
