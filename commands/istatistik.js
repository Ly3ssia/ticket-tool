const { Client, EmbedBuilder } = require("discord.js");
const moment = require("moment");
  require("moment-duration-format");
  const os = require("os");
module.exports = {
  name: "istatistik",
  description: "Botun istatistiğini görürsün!",
  type: 1,
  options: [],

  run: async(client, interaction) => {
    const Uptime = moment
    .duration(client.uptime)
    .format(" D [gün], H [saat], m [dakika], s [saniye]");
    const embed = new EmbedBuilder()
    .addFields({ name: 'Bot Sahibi', value: `rush#5124`, inline: false})
    .addFields({ name: '• Bellek Kullanımı', value: `${(process.memoryUsage().heapUsed /1024 /512).toFixed(2)}MB`, inline: true})
    .addFields({ name: '• Çalışma Süresi', value: `${Uptime}`, inline: true})
    .addFields({ name: '• Toplam Kullanıcılar', value: `${client.users.cache.size}`, inline: false})
    .addFields({ name: '• Toplam Sunucular', value: `${client.guilds.cache.size}`, inline: false})
    .addFields({ name: '• Toplam Kanallar', value: `${client.channels.cache.size}`, inline: false})
    .addFields({ name: '• İşletim Sistemi', value: `Ubuntu 18`, inline: false})
    .addFields({ name: '• İşlemci', value: `${os.cpus().map(i => `${i.model}`)[0]}`, inline: false})
    .addFields({ name: '• Discord.JS sürüm', value: `14.2.0`, inline: true})
    .addFields({ name: '• Node.JS sürüm', value: `v16.14.2`, inline: true})
    .addFields({ name: '• Bot Kuruluş Tarihi', value: `23.01.2023`, inline: true})
    .addFields({ name: '• Komut Sayısı', value: `Bilinmiyor`, inline: true})
    .addFields({ name: '• Ping', value: `${client.ws.ping}`, inline: true})
    interaction.reply({embeds: [embed]})

  }

};
