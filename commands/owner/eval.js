const discord = require('discord.js');

module.exports = {
    name: 'eval',
    aliases: ['e'],
    run: async(client, message, args) => {

        if(message.author.id !== '841392424617377815') return;

        try {
    
            let evaled = eval(args.join(' '));
            
            let inspected = require('util').inspect(evaled);
            
            let m = await message.inlineReply({content:`\`\`\`js\n${inspected}\n\`\`\``})
              
            } catch(err) {
              message.inlineReply(`\`\`\`js\n${err.message}\`\`\``)
            }

    }
}