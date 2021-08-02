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
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
  measurementId: ""
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
