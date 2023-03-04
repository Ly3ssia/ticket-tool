const Discord = require('discord.js')
const client = new Discord.Client({ intents: 131071 })
const { botid, token } = require("./ayarlar.json")
require("./slash")(client)

// ! TOKEN Retnox#2728 Retnox#2728 Retnox#2728Retnox#2728
// Retnox#2728 Retnox#2728 Retnox#2728 Retnox#2728 
client.login(token)