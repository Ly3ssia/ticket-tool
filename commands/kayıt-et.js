const { PermissionsBitField } = require("discord.js");
const db = require("croxydb")
module.exports = {
    name:"kayıt-et",
    description: 'Kayıtlı rol ayarlarsın!',
    type:1,
    options: [
        {
            name:"user",
            description:"Kayıt ediceğin kullanıcıyı etiketle!",
            type:6,
            required:true
        },
        {
            name:"isim",
            description:"Kullanıcının İsmini Gir!",
            type:3,
            required:true
        },
        {
            name:"yaş",
            description:"Kullanıcının Yaşını Gir!",
            type:3,
            required:true
        },
    ],
  run: async(client, interaction) => {

    if(!interaction.member.permissions.has(PermissionsBitField.Flags.ManageRoles)) return interaction.reply({content: "Rolleri Yönet Yetkin Yok!", ephemeral: true})
    const user = interaction.options.getMember('user')
    const isim = interaction.options.getString('isim')
    const yas = interaction.options.getString('yaş')
let kayıtlı = db.fetch(`kayıtlı_${interaction.guild.id}`)
if (!kayıtlı) return interaction.reply("Kayıtlı rolü ayarlanmamış!")
interaction.guild.members.cache.get(user.id).roles.add(kayıtlı)
user.setNickname(`${isim} | ${yas}`)

    interaction.reply({content: `Başarıyla ${user} Kullanıcısını Kayıt Ettim!`})
}

};
