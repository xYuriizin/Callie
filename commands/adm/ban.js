const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "ban",
    aliases: ['banir'],
    usage: '<@member | member ID> [reason] opcional',
    description: "Bane um usuario do servidor!",

    run: async(client, message, args) => {

        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Motivo não inserido";

        if (!message.member.hasPermission("BAN_MEMBERS")) return message.inlineReply(`${message.author}, Você precisa da permissão \`Banir membros\` para usar esse comando!`)

        if (!message.guild.me.hasPermission('BAN_MEMBERS')) return message.inlineReply(`${message.author}, Eu preciso da permissão \`Banir membros\` para usar esse comando!`)

        if(!mentionMember) return message.inlineReply(`${message.author}, Você não informou algum membro!\n> Lembre-se, eu procuro usuário por IDs e menções!`)

        if (message.author.id === mentionMember.id) return message.inlineReply(`${message.author}, Você não pode banir você mesmo, bobinho!`)

        if(!mentionMember.bannable) return message.inlineReply(`${message.author}, Eu não posso banir esse usuário! Experimente colocar meu cargo acima de todos para eu poder banir!`)

        var msg = await message.inlineReply(`${message.author} Você realmente deseja banir o usuário ${mentionMember} - \`${mentionMember.id}\`?\n> Clique no emoji abaixo para confirmar!`)
        msg.react('✅')

        const filtro = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const coletor = msg.createReactionCollector(filtro, { dispose: false, max: 1, time: 60000 * 2});

        coletor.on('collect', r2 => {
            mentionMember.ban({ reason: message.author.tag + ': ' + reason})
        .then(() => message.inlineReply(`${message.author} Usuário banido com sucesso!`));
        })
    }
}
