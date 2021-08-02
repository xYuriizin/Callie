const discord = require('discord.js');

module.exports = {
    name: 'fakemsg',
    usage: '<@user | user ID> <msg>',
    aliases: ['wh'], 
    description: 'cria uma mensagem fake com foto e nome do usuário!',
    run: async(client, message, args) => {
        if(!message.member.hasPermission('MANAGE_WEBHOOKS')) return message.inlineReply(`${message.author}, Você precisa ter permissão de \`Gerenciar webhooks\` para usar esse comando!`)
        if(!message.guild.me.hasPermission('MANAGE_WEBHOOKS')) return message.inlineReply(`${message.author}, Eu preciso da permissão de \`Gerenciar webhooks\` para usar esse comando!`)

    try {
        const user = message.mentions.users.first() || client.users.cache.get(args[0])
        if(!user) return message.inlineReply(`${message.author}, Informe um usuário para fazer a fakemsg!`)

        const avatar = user.displayAvatarURL()
        const name = user.username
        const res = args.slice(1).join(' ')
        if(!res) return message.inlineReply(`${message.author}, Informe uma mensagem fake!`)

        message.delete()
        message.channel.createWebhook(name, {
            avatar: avatar,
        }).then(w => {
            w.send(res).then(() => w.delete())
        })
        
    } catch(err) {
        message.inlineReply(`${message.author}, Ocorreu um erro:\n\`${err}\``)
    }

    }
}
