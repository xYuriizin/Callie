const { MessageEmbed } = require('discord.js');

module.exports = {
    name: "kick",
    aliases: ['expulsar'],
    usage: '<@member | member ID> [reason] opcional',
    description: "expulse um usuario do servidor!",

    run: async(client, message, args) => {

        const mentionMember = message.mentions.members.first() || message.guild.members.cache.get(args[0])
        let reason = args.slice(1).join(" ");
        if (!reason) reason = "Motivo não inserido";

        if (!message.member.hasPermission("KICK_MEMBERS")) return message.inlineReply(`${message.author}, Você precisa da permissão \`Expulsar membros\` para usar esse comando!`)

        if (!message.guild.me.hasPermission('KICK_MEMBERS')) return message.inlineReply(`${message.author}, Eu preciso da permissão \`Expulsar membros\` para usar esse comando!`)

        if(!mentionMember) return message.inlineReply(`${message.author}, Você não informou algum membro!\n> Lembre-se, eu procuro usuário por IDs e menções!`)

        if (message.author.id === mentionMember.id) return message.inlineReply(`${message.author}, Você não pode expulsar você mesmo, bobinho!`)

        if(!mentionMember.kickable) return message.inlineReply(`${message.author}, Eu não posso expulsar esse usuário! Experimente colocar meu cargo acima de todos!`)

        var msg = await message.inlineReply(`${message.author} Você realmente deseja expulsar o usuário ${mentionMember} - \`${mentionMember.id}\`?\n> Clique no emoji abaixo para confirmar!`)
        msg.react('✅')

        const filtro = (reaction, user) => reaction.emoji.name === '✅' && user.id === message.author.id;
        const coletor = msg.createReactionCollector(filtro, { dispose: false, max: 1, time: 60000 * 2});

        coletor.on('collect', r2 => {
            mentionMember.kick({ reason: message.author.tag + ': ' + reason})
        .then(() => message.inlineReply(`${message.author} Usuário expulso com sucesso!`));
        })
    }
}