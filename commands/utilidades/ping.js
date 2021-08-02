const { MessageEmbed } = require('discord.js')
module.exports = {
    name : 'ping',
    category : 'info',
    description : 'Mostra o ping do bot',

    /**
     * @param {Client} client
     * @param {Message} message
     * @param {String[]} args
     */

    run : async(client, message, args) => {

            message.inlineReply(`🏓 | ${message.author} Pong!\n**WebSocket: ${client.ws.ping}MS!**`)
            

    }
}
