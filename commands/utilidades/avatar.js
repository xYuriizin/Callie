const discord = require('discord.js');

module.exports = {
    name: 'avatar',
    usage: '[@mention | user ID]',
    aliases: ['av'], 
    description: 'Mostra seu avatar ou de outra pessoa!',
    run: async(client, message, args) => {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author
        const av = user.displayAvatarURL({dynamic: true, size: 2048})

        const embed = new discord.MessageEmbed()
        .setTitle(`**${user.username}**`)
        .setDescription(`Clique [aqui](${av}) para baixar a imagem!`)
        .setImage(av)
        .setColor('PURPLE')

        message.inlineReply(message.author, embed)

    }
}
