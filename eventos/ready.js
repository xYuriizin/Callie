const client = require('../index')

client.on('ready', () => {
    client.user.setActivity(`Meu prefixo padrão é ' use 'help para mais!`)
    console.log(`${client.user.tag} tá online! ✅`)
    console.log(`             _ _ _      
    ___ __ _| | (_) ___ 
   / __/ _\` | | | |/ _ \\
  | (_| (_| | | | |  __/
   \\___\\__,_|_|_|_|\\___|`)
  })