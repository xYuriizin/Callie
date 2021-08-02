const client = require('../index')

client.on('guildCreate', (guild) => {
    const dev = client.channels.cache.get('868905790143098890')
    const gname = guild.name
    const gid = guild.id
    const gowner = guild.owner.user.tag
    const gownerid = guild.owner.id
    const gmembers = guild.memberCount
  
    dev.send(`Fui adicionado em um novo servidor!\n**Nome:** \`${gname}\`\n**ID:** \`${gid}\`\n**Dono:** \`${gowner}\` **-** \`${gownerid}\`\n**Membros:** \`${gmembers}\``)
  })