const discord = require('discord.js');
const firebase = require('firebase');
const db = require('firebase');
const database = firebase.database();

module.exports = {
    name: 'setprefix',
    usage: '<novo_prefixo>',
    aliases: ['set-prefix', 'prefixo', 'setprefixo', 'set-prefixo'], 
    description: 'muda o meu prefixo no servidor atual!',
    run: async(client, message, args) => {

        const prefixref = database.ref(`prefixos/servidores/${message.guild.id}`)
        const prefixdb = await prefixref.once('value')

        if(!message.member.hasPermission('MANAGE_GUILD')) return message.channel.send(`${message.author}, Você precisa da permissão \`Gerenciar servidor\` para usar esse comando!`)

        if(!args[0] || args[0].length > 3) return message.channel.send(`${message.author}, Informe um novo prefixo com menos de **3** caracteres!`)

        message.channel.send(`${message.author}, Prefixo alterado com sucesso!\n> Novo prefixo: **${args[0]}**`)

        prefixref.set({
            prefix: args[0]
        })

    }
}
