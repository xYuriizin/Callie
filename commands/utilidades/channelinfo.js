const discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: 'channelinfo',
    usage: '[#channel | channel ID] opcional',
    aliases: ['ci', 'channel-info', 'chinfo', 'cinfo'], 
    description: 'Mostra as informações sobre o canal!',
    run: async(client, message, args) => {
        const ch = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]) || message.channel
        var topic = ch.topic
        if(!topic) topic = 'O canal não possui nenhum tópico!'
        var nsfw = ch.nsfw
        if(nsfw === true) {
            nsfw = 'Sim'
        } else {
            nsfw = 'Não'
        }
        var messages = await ch.messages.fetch({ limit: 2 });
        var lastMessage = messages.last();

        const embed = new discord.MessageEmbed()
        .setTitle(`**Canal - #${ch.name}**`)
        .setDescription(`> ${topic}`)
        .setColor('PURPLE')
        .addFields(
            {
                name: '**ID do canal**',
                value: `\`${ch.id}\``
            },
            {
                name: '**Menção**',
                value: `\`${ch}\``
            },
            {
                name: '**NSFW**',
                value: '`' + nsfw + '`'
            },
            {
                name: '**Criado em**',
                value: `${moment(ch.createdTimestamp).format('LLLL')} (${moment(ch.createdTimestamp).fromNow()})`
            },
            {
                name: '**Última mensagem do canal**',
                value: '```\n' + lastMessage.content + '```'
            }
        )

        message.inlineReply(message.author, embed)

    }
}
