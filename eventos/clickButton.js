const client = require('../index')

client.on('clickButton', async(button) => {
    if(button.id === 'sim') {
        button.channel.send('nossa você é lindo msmkk')
       
    } else if (button.id === 'nao') {
        button.channel.send('ih que gay')
        
    }
})