const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const config = require("../config.json")
const token = config.token
module.exports = {
  name: "yavaş-mod",
  description: "Kanalın Yavaş Modunu Ayarlarsın!",
  type: 1,
  options: [
    {
        name:"kanal",
        description:"Lütfen bir kanal etiketle!",
        type:7,
        required:true,
        channel_types:[0]
    },
    {
        name:"saniye",
        description:"Yavaş Modu Kaç Saniye Yapıcaksın?",
        type:3,
        required:true
    },
   
   
    
],

  run: async(client, interaction) => {
    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) return interaction.reply({content: "Kanalları Yönet Yetkin Yok!", ephemeral: true})
    const kanal2 = interaction.options.getChannel('kanal')
    const s = interaction.options.getString('saniye') 
    if (s > 21600) return interaction.reply("Süre limiti maksimum **6** saat olabilir.")
    var request = require('request');
request({
url: `https://discordapp.com/api/v9/channels/${kanal2.id}`,
method: "PATCH",
json: {
rate_limit_per_user: s
},
headers: {
"Authorization": `Bot ${token}`
},
})
   interaction.reply(`Yazma süre limiti **${s}** saniye olarak ayarlanmıştır.`)


  }

};
