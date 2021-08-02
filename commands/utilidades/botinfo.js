const discord = require('discord.js');
const fire = require('firebase')
const database = fire.database()
const pms = require('pretty-ms')

module.exports = {
    name: 'botinfo',
    aliases: ['bi'], 
    description: 'mostra informações sobre mim!',
    run: async(client, message, args) => {
        const prefi = database.ref(`prefixos/servidores/${message.guild.id}`)
        const prefixdb = await prefi.once('value')
        const prefixo = prefixdb.val().prefix

        const yuri = client.users.cache.get('841392424617377815')
        const bot = client.user

        const embed = new discord.MessageEmbed()
        .setTitle(`**${bot.tag}**`)
        .setDescription(`Olá **${message.author.tag}**! Me chamo **${bot.username}** e sou um bot com multi propósitos, sendo eles, economia, moderação básica, informação e diversão! São todos comandos básicos mas que podem animar seu servidor, obrigado por me adicionar! ☺\nFaz **${pms(client.uptime)}** desde que acordei e estou em **${client.guilds.cache.size.toLocaleString()}** servidores, com **${client.users.cache.size.toLocaleString()}** usuários, possuindo um total de **${client.commands.size}** comandos!\nMe convide para o seu servidor clicando [aqui](https://discordapp.com/oauth2/authorize?client_id=858556916204699690&scope=bot&permissions=8)\nVote em mim no [top.gg](https://top.gg/bot/858556916204699690)!`)
        .setThumbnail(bot.displayAvatarURL({dynamic: true}))
        .setColor('PURPLE')
        .setTimestamp()
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL({dynamic: true}))
        .addFields(
            {
                name: '**Meu criador**',
                value: `\`\`\`\n${yuri.tag} - ${yuri.id}\n\`\`\``
            },
            {
                name: '**Banco de dados**',
                value: '```\nFirebase - Realtime database\n```'
            },
            {
                name: '**Prefixo atual**',
                value: '```\n' + prefixo + '\n```'
            }
        )

        message.inlineReply(message.author, embed)

    }
}
