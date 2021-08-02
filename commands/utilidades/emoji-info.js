const { MessageEmbed } = require("discord.js")
const { utc } = require("moment")

module.exports = {
    name: 'emojiinfo',
    aliases: ['einfo', 'ei', 'emoji'],
    run: async(client, message, args) => {
        const EMOJI_REGEX = /:[^:\s]*(?:::[^:\s]*)*:/ 

        if(!EMOJI_REGEX.test(args[0])) {
            return message.inlineReply(`${message.author} Isso não é um emoji!`)
        } else {
            const emoji = args[0].trim().split(':')[2].slice(0, 18)

            const emojis = client.emojis.cache.find(emoje => emoje.id == emoji)

            const embed = new MessageEmbed()
            .setTitle(`**${emojis.name}**`)
            .setThumbnail(emojis.url)
            .setColor('PURPLE')
            .addField(`**Criado há:**`, utc(emojis.createdAt).format('LL') + ' - (' + utc(emojis.createdAt).format('LLLL') + ')')
            .addField(`**Link:**`, `[Clique aqui](${emojis.url})`)
            .addField(`**ID do emoji:**`, `\`${emojis.id}\``)
            .addField(`**Servidor do emoji**`, emojis.guild.name)
            message.inlineReply(message.author, embed)
        } 
    }
}       