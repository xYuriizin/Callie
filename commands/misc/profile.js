const Discord = require('discord.js')
const firebase = require('firebase')
const database = firebase.database();
const Canvas = require('canvas')
Canvas.registerFont('./assets/fontes/OpenSans-Bold.ttf', { family: 'Bold' })

module.exports = {
  name: 'perfil',
  aliases: ['pl', 'profile'],
  run: async(client, message, args) => {
    if(message.author.id !== '841392424617377815') return;
    
    var user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;
    // --- //

    //firebase
    const refeco = database.ref(`economia/${user.id}`)
    const dbeco = await refeco.once('value')
    if(dbeco.val() === null) {
      refeco.set({
        esmeraldas: 0,
        rubys: 0
      })
      return message.channel.send(`${user} Salvo em meu banco de dados de economia!`)
    }
    
    const refpl = database.ref(`perfil/${user.id}`)
    const dbpl = await refpl.once('value')
    if(dbpl.val() === null) {
      refpl.set({
        reps: 0,
        background: 'https://cdn.discordapp.com/attachments/861059770340868116/862805063273545728/Polish_20210708_181910184.png',
        sobremim: 'Use (prefixo)sobremim para mudar sua descrição!'
      })
      return message.channel.send(`${user} Salvo em meu banco de dados de perfil!`)
    }
    //

  const canvas = Canvas.createCanvas(1980, 1080);
	const context = canvas.getContext('2d');
	
	const background = await Canvas.loadImage(dbpl.val().background)
 
 
	context.drawImage(background, 0, 0, canvas.width, canvas.height);
    
  const base = await Canvas.loadImage('https://cdn.discordapp.com/attachments/852653817664241685/862572407420485662/perfil_2.png')
  
  context.drawImage(base, 0, 0, canvas.width, canvas.height)

  //textos
  context.font = '75px "Bold"';

  context.fillStyle = '#ffffff';

  context.fillText(`${user.tag}`, 400, 110)

  context.font = '50px "Bold"'
	
	context.fillStyle = '#ffffff';
	
	context.fillText(`Esmeraldas: ${dbeco.val().esmeraldas}`, 400, 210)

  context.font = '50px "Bold"'
	
	context.fillStyle = '#ffffff';
	
	context.fillText(`Reps: ${dbpl.val().reps}`, 400, 280)

	context.font = '50px "Bold"'
	
	context.fillStyle = '#ffffff';
	
	context.fillText(`Sobre mim`, 50, 910)

  context.font = '45px "Bold"'
	
	context.fillStyle = '#ffffff';
	
	context.fillText(dbpl.val().sobremim, 50, 960)
	// avatar
	
	context.beginPath();
	
	context.arc(200, 180, 160, 0, Math.PI * 2, true);
	
	context.lineWidth = 20;
	
	context.strokeStyle = "#ffffff";
	
	context.stroke();
	
	context.closePath();

	context.clip();
	
	// -----
 
	const avatar = await Canvas.loadImage(`${user.displayAvatarURL({ format: 'png', dynamic: true, size: 2048 })}`)
	
	context.drawImage(avatar, 25, 25, 350, 320)
    
  // att

	const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'perfil.png');

	message.channel.send(message.author, attachment)
	
  }
}
