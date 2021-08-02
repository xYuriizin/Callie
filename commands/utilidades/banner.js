const axios = require('axios');
const discord = require('discord.js')

module.exports = {
    name: 'banner',
    aliases: ['get-banner', 'gbanner', 'getbanner', 'bn'],
    description: 'Mostra o banner de um usuário!',
    usage: '[@user | user ID] opcional',
    run: async(client, message, args) => {
        const user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author

        axios.get(`https://discord.com/api/users/${user.id}`, {
            headers: {
                Authorization: `Bot ${client.token}`,
            },
        })
        .then((res) => {
            const { banner, accent_color } = res.data;

            if(banner) {
                const extension = banner.startsWith('a_') ? '.gif' : '.png'
                const url = `https://cdn.discordapp.com/banners/${user.id}/${banner}${extension}?size=4096`;

                const embed = new discord.MessageEmbed()
                .setTitle(`**${user.tag} Banner**`)
                .setDescription(`Clique [aqui](${url}) para baixar o banner!`)
                .setImage(url)
                .setColor('PURPLE')

                message.inlineReply(message.author, embed)

            } else {
                if(accent_color) {
                    const emb = new discord.MessageEmbed()
                    .setDescription(`**${user.tag} Não tem um banner personalizado mas tem uma cor!`)
                    .setColor(accent_color)

                    message.inlineReply(message.author, emb)
                } else return message.inlineReply(`${user} Não tem banner nem cor personalizada!`)
            }
        })
    }
}