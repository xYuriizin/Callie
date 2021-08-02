const discord = require('discord.js');
const firebase = require('firebase');
const db = require('firebase');
const database = firebase.database();

module.exports = {
    name: 'puxar',
    run: async(client, message, args) => {
        var db = await database.ref("rifa").once("value");
      if(db.val() === null) return;
      var users = Object.entries(db.val()).filter(([a, b]) => b).map(([a, b]) => a);
      var res = users[Math.floor(Math.random() * users.length)]

      message.inlineReply(res)


    }
}
