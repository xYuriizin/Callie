const {readdirSync} = require('fs');
const ascii = require('ascii-table')
let table = new ascii("Comandos");
table.setHeading('Comando', ' Status cmd');
module.exports= (client) => {
    readdirSync('./commands/').forEach(dir => {
        const commands = readdirSync(`./commands/${dir}/`).filter(file => file.endsWith('.js'));
        for(let file of commands){
            let pull = require(`../commands/${dir}/${file}`);
            if(pull.name){
                client.commands.set(pull.name, pull);
                table.addRow(file,'✅')
            } else {
                table.addRow(file, '❌ -> Missing a help.name, or help.name is not a string.')
                continue;
            }if(pull.aliases && Array.isArray(pull.aliases)) pull.aliases.forEach(alias => client.aliases.set(alias, pull.name))
        }
    });
    console.log(table.toString());

    readdirSync("./eventos/").forEach((file) => {
        const events = readdirSync("./eventos/").filter((file) =>
          file.endsWith(".js")
        );
    
        for (let file of events) {
          let pull = require(`../eventos/${file}`);
    
          if (pull.name) {
            client.events.set(pull.name, pull);
          } else {
            continue;
          }
        }
      });
}
