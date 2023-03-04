const Discord = require('discord.js')
const pcooldown = new Discord.Collection()
const { prefix, ownerid } = require("../ayarlar.json")

module.exports = {
    name: 'messageCreate',
    execute(message, client) {

        if (message.author.bot) return
        if (!message.content.startsWith(prefix)) return
        let command = message.content.split(" ")[0].slice(prefix.length)
        let args = message.content.split(" ").slice(1)
        let cmd = client.commands.get(command)
        if (!cmd) return

        // * COOLDOWN
        if (message.author.id !== ownerid) {
            if (!pcooldown.has(cmd.name[0])) {
                pcooldown.set(cmd.name[0], new Discord.Collection())
            }

            const now = Date.now()
            const timestampt = pcooldown.get(cmd.name[0])
            const cooldownAmount = (cmd.cooldown) * 1000

            if (timestampt.has(message.author.id)) {
                const expiration = timestampt.get(message.author.id) + cooldownAmount

                if (now < expiration) {
                    const timeleft = Math.round((expiration - now) / 1000)

                    const embeduyarı = new Discord.MessageEmbed()
                        .setDescription(`:x: Bu Komutu Kullanabilmek için **${timeleft} Saniye** Beklemelisin`)
                        .setColor('RED')
                    message.channel.send({ embeds: [embeduyarı] }).then(msg => {
                        setTimeout(() => { msg.delete() }, expiration - now)
                    })
                    return
                }

            } else {

                timestampt.set(message.author.id, now)
                setTimeout(() => timestampt.delete(message.author.id), cooldownAmount)
            }
        }

        // * YETKİLER
        if (cmd.yetki) {

            var yetki = cmd.yetki.replace("MANAGE_EMOJIS", 'Emojileri Yönet').replace("KICK_MEMBERS", 'Kullanıcıyı Uzaklaştır').replace("BAN_MEMBERS", 'Kullanıcıyı Yasakla').replace('ADMINISTRATOR', 'Yönetici').replace("MANAGE_CHANNELS", 'Kanalları Yönet').replace("MANAGE_MESSAGES", 'Mesajları Yönet').replace("MANAGE_ROLES", 'Rolleri Yönet')

            var yetkiyok = new Discord.MessageEmbed()
            .setDescription(`
            :x: Yetersiz Yetki
        
            Gerekli Yetki: '**${yetki}**'
            `)
            .setColor('RED')
            if (!message.member.permissions.has(`${cmd.yetki}`)) return message.channel.send({ embeds: [yetkiyok] })
        }

        if (cmd.botyetki) {

            var botyetki = cmd.botyetki.replace("MANAGE_EMOJIS", 'Emojileri Yönet').replace("KICK_MEMBERS", 'Kullanıcıyı Uzaklaştır').replace("BAN_MEMBERS", 'Kullanıcıyı Yasakla').replace('ADMINISTRATOR', 'Yönetici').replace("MANAGE_CHANNELS", 'Kanalları Yönet').replace("MANAGE_MESSAGES", 'Mesajları Yönet').replace("MANAGE_ROLES", 'Rolleri Yönet')

            var botyetkiyok = new Discord.MessageEmbed()
            .setDescription(`
            :x: Yetersiz Yetkiye Sahibim
        
            Gerekli Yetki: '**${botyetki}**'
            `)
            .setColor('RED')
            if (!message.guild.me.permissions.has(`${cmd.botyetki}`)) return message.channel.send({ embeds: [botyetkiyok] })
        }

        cmd.execute(client, message, args)

    }
}