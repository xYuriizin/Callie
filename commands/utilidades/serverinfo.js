const discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: 'serverinfo',
    description: 'mostra as informações do servidor!',
    run: async(client, message, args) => {
        const ch = message.guild.channels.cache;
        const bot = message.guild.members.cache.get(client.user.id);

        const embed = new discord.MessageEmbed()
        .setTitle(`**${message.guild.name}**`)
        .addField(`**ID**`, message.guild.id, true)
        .addField(`**👑 Dono**`, `${message.guild.owner.user.tag} (**${message.guild.owner.id}**)`, true)
        .addField(`**Membros**`, '`' + message.guild.memberCount + '`', true)
        .addField(`**Canais (${ch.filter(ct => ct.type === 'text').size + ch.filter(cv => cv.type === 'voice').size})**`, `Voz: ${ch.filter(cv => cv.type === 'voice').size}\nTexto: ${ch.filter(cv => cv.type === 'text').size}`, true)
        .addField(`**Região**`, message.guild.region, true)
        .addField(`**Criado em**`, `${moment(message.guild.createdTimestamp).format('LLLL')} (${moment(message.guild.createdTimestamp).fromNow()})`, true)
        .addField(`**Entrei aqui em**`, `${moment(bot.joinedAt).format("LLLL")} (${moment(bot.joinedAt).fromNow()})`)
        .setColor('PURPLE')
        .setTimestamp()
        .setThumbnail(message.guild.iconURL({dynamic: true}))

        message.inlineReply(message.author, embed)

    }
}
