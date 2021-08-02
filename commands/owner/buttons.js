const discord = require('discord.js');
const firebase = require('firebase');
const db = require('firebase');
const database = firebase.database();

module.exports = {
    name: 'teste',
    run: async(client, message, args) => {
      var ref = database.ref(`rifa/${message.author.id}`).set({p: true});

      message.inlineReply('salvo')

    }
}
