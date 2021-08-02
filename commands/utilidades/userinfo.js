const discord = require('discord.js');
const moment = require('moment');
moment.locale('pt-BR')

module.exports = {
    name: 'userinfo',
    aliases: ['ui'],
    usage: '[@user | ID] opcional',
    description: 'Mostra as informações sobre você ou o usuário da mensagem!',
    run: async(client, message, args) => {

        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author || client.users.cache.find(user => user.username == args[0])
        const memb = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member || message.guild.members.cache.find(user => user.username == args[0])
        var color = memb.displayHexColor 
        if(color === '#000000') color = 'PURPLE'
        var perms = memb.permissions.toArray().map(p => p.replace('BAN_MEMBERS', 'Banir membros').replace('CREATE_INSTANT_INVITE', 'Criar convite instantâneo').replace('ADD_REACTIONS', 'Adicionar reações').replace('STREAM', 'Stream').replace('VIEW_CHANNEL', 'Ver canal').replace('SEND_MESSAGES', 'Enviar mensagens').replace('EMBED_LINKS', 'Inserir links').replace('ATTACH_FILES', 'Anexar arquivos').replace('READ_MESSAGE_HISTORY', 'Ler histórico de mensagens').replace('USE_EXTERNAL_EMOJIS', 'Usar emojis externos').replace('CONNECT', 'Conectar').replace('PRIORITY_SPEAKER', 'Voz prioritária').replace('SPEAK', 'Falar').replace('USE_VAD', 'Usar comandos /').replace('CHANGE_NICKNAME', 'Mudar apelido').replace('KICK_MEMBERS', 'Expulsar membros').replace('MANAGE_CHANNELS', 'Gerenciar canais').replace('ADMINISTRATOR', 'Administrador').replace('MANAGE_GUILD', 'Gerenciar servidor').replace('VIEW_AUDIT_LOG', 'Ver registro de auditoria').replace('SEND_TTS_MESSAGES', 'Enviar mensagens TTS').replace('MANAGE_MESSAGES', 'Gerencias mensagens').replace('MENTION_EVERYONE', 'Mencionar everyone').replace('VIEW_GUILD_INSIGHTS', 'Ver análises do servidor').replace('MUTE_MEMBERS', 'Silenciar membros').replace('DEAFEN_MEMBERS', 'Ensurdecer membros').replace('MOVE_MEMBERS', 'Mover membros').replace('MANAGE_NICKNAMES', 'Gerenciar apelidos').replace('MANAGE_ROLES', 'Gerenciar cargos').replace('MANAGE_WEBHOOKS', 'Gerenciar webhooks').replace('MANAGE_EMOJIS', 'Gerenciar emojis')).join(', ')
        var roles = memb.roles.cache.map(r => r.name).join(', ')
        if(message.guild.members.cache.has(user.id) === false) {
            perms = 'Usuário não possui nenhuma permissão pois não está no servidor!'
            roles = 'Usuário não possui nenhum cargo pois não está no servidor!'
        }

        const embed = new discord.MessageEmbed()
        .setTitle(`**${user.tag}**`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor(color)
        .setTimestamp()
        .addFields(
            {
                name: '**📝 Tag discord**',
                value: user.tag,
                inline: true
            },
            {
                name: '**🆔 ID do usuário**',
                value: user.id,
                inline: true
            },
            {
                name: '**📆 Conta criada há**',
                value: `${moment(user.createdTimestamp).format('LLLL')} (${moment(user.createdTimestamp).fromNow()})`,
                inline: true
            }
        )

                
        if(message.guild.members.cache.has(user.id) === true) {
            embed.addField(`**📅 Entrou aqui há**`, `${moment(memb.joinedAt).format("LLLL")} (${moment(memb.joinedAt).fromNow()})`)
        }

        const embperms = new discord.MessageEmbed()
        .setColor(color)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setTimestamp()
        .addFields(
            {
                name: '**Permissões**',
                value: '`' + perms + '`'
            },
            {
                name: '**Cargos**',
                value: '`' + roles + '`'
            }
        )

       var msg = await message.inlineReply(message.author, embed)
       msg.react('◀')
       msg.react('▶')

       const filtro1 = (r, u) => r.emoji.name === '▶' && u.id === message.author.id;
       const coletor1 = msg.createReactionCollector(filtro1, {dispose: false, time: 60000 * 3 })

       coletor1.on('collect', async => {
           msg.edit(embperms)
       })

       const filtro2 = (r, u) => r.emoji.name === '◀' && u.id === message.author.id;
       const coletor2 = msg.createReactionCollector(filtro2, {dispose: false, time: 60000 * 3})
 
       coletor2.on('collect', async => {
           msg.edit(embed)
       })
    }
}
