const discord = require('discord.js');

module.exports = {
    name: 'kiss',
    usage: '<@user> | user ID',
    aliases: ['beijar'], 
    description: 'beija um usuário!',
    run: async(client, message, args) => {

        var gifs = [
            'https://loritta.website/assets/img/actions/kiss/both/gif_283.gif',
            'https://cdn.discordapp.com/attachments/863100667282849822/868950056475181096/tenor.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868950592389800056/tenor_1.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868950794085486632/tenor_2.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951003096035408/tenor_3.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951861657473084/tenor_1.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951868368388156/tenor_2.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951870192893992/tenor_3.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951875351896215/tenor_4.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951877683933234/tenor_5.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951880770920548/tenor_6.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951885632110622/tenor_7.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951887058198558/tenor_8.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951888459071528/tenor_9.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951891512557588/tenor_10.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951910198165524/tenor_12.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951924660138004/tenor_14.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951931291320390/tenor_15.gif',
            'https://cdn.discordapp.com/attachments/856600757154873397/868951941621895219/tenor.gif'
        ]
        var randgif = gifs[Math.floor(Math.random() * gifs.length)]
        var randgif2 = gifs[Math.floor(Math.random() * gifs.length)]

        var userr = message.mentions.users.first() || client.users.cache.get(args[0])
        if(!userr) return message.inlineReply(`${message.author}, Você precisa informar alguém para beijar! Lembre-se, eu procuro usuários por IDs e menções!`)
        if(userr.id === client.user.id && message.author.id !== '841392424617377815') return message.inlineReply(`${message.author}, Desculpe mas, eu já sou comprometida! :cry:`)

        const embed = new discord.MessageEmbed()
        .setDescription(`${message.author} **Deu um beijo em** ${userr}!`)
        .setColor('RED')
        .setImage(randgif)
        .setFooter("Reaja em 🔁 para retribuir!")

        const sad = new discord.MessageEmbed()
        .setDescription(`${message.author} **Beijou a sí mesmo!**`)
        .setColor('RED')
        .setImage(randgif)
        if(message.author.id === userr.id) return message.inlineReply(message.author, sad)

        var msg = await message.inlineReply(message.author, embed)
        msg.react('🔁')

        const filtro = (reaction, user) => reaction.emoji.name === '🔁' && user.id === userr.id;
        const coletor = msg.createReactionCollector(filtro, { dispose: false, max: 1, time: 60000 * 2 })

        coletor.on('collect', async r2 => {

            const repeat = new discord.MessageEmbed()
            .setDescription(`${userr} **Retribuiu o beijo de** ${message.author}`)
            .setImage(randgif2)
            .setColor('RED')

            message.inlineReply(message.author, repeat)

        })


    }
}
