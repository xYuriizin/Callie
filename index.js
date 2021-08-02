const { Collection, Client, Discord } = require('discord.js');
require("./inline");
const client = new Client({
  disableEveryone: true
})
require("discord-buttons")(client);

const fs = require('fs');
const config = require('./config.json');
const firebase = require('firebase');
const moment = require('moment');

var configf = {
  apiKey: "AIzaSyDSiwor1-lxXRNwZ9JoYqRG1fOxuEdyfvU",
  authDomain: "kitsunemi-417d5.firebaseapp.com",
  projectId: "kitsunemi-417d5",
  storageBucket: "kitsunemi-417d5.appspot.com",
  messagingSenderId: "1066573681655",
  appId: "1:1066573681655:web:800a79f9b1347b494dd4f2",
  measurementId: "G-ZPTGHJ73BM"
};
// Initialize Firebase
firebase.initializeApp(configf);

const token = config.token;
module.exports = client;
client.commands = new Collection();
client.aliases = new Collection();
client.categories = fs.readdirSync("./commands/");
["command"].forEach(handler => {
  require(`./handlers/${handler}`)(client);
});

client.login(token)
