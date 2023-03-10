const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
module.exports = {
    name:"avatar",
    description: 'Birinin Avatarına Bakarsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Avatarına Bakmak İstediğin Kullanıcıyı Etiketle!",
            type:6,
            required:true
        },
      
    ],
  run: async(client, interaction) => {

    const user = interaction.options.getMember('user')
   
    interaction.reply(user.displayAvatarURL({ dynamic: true, size: 1024 }))
}

};
