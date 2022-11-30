const {PermissionsBitField, EmbedBuilder, ButtonStyle, Client, GatewayIntentBits, ChannelType, Partials, ActionRowBuilder, SelectMenuBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, InteractionType, SelectMenuInteraction, ButtonBuilder } = require("discord.js");
const config = require("./config.js");
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
  partials: [
    Partials.Message, // for message
    Partials.Channel, // for text channel
    Partials.GuildMember, // for guild member
    Partials.Reaction, // for message reaction
    Partials.GuildScheduledEvent, // for guild events
    Partials.User, // for discord user
    Partials.ThreadMember, // for thread member
  ],
  intents: [
    GatewayIntentBits.Guilds, // for guild related things
    GatewayIntentBits.GuildMembers, // for guild members related things
    GatewayIntentBits.GuildBans, // for manage guild bans
    GatewayIntentBits.GuildEmojisAndStickers, // for manage emojis and stickers
    GatewayIntentBits.GuildIntegrations, // for discord Integrations
    GatewayIntentBits.GuildWebhooks, // for discord webhooks
    GatewayIntentBits.GuildInvites, // for guild invite managing
    GatewayIntentBits.GuildVoiceStates, // for voice related things
    GatewayIntentBits.GuildPresences, // for user presence things
    GatewayIntentBits.GuildMessages, // for guild messages things
    GatewayIntentBits.GuildMessageReactions, // for message reactions things
    GatewayIntentBits.GuildMessageTyping, // for message typing things
    GatewayIntentBits.DirectMessages, // for dm messages
    GatewayIntentBits.DirectMessageReactions, // for dm message reaction
    GatewayIntentBits.DirectMessageTyping, // for dm message typinh
    GatewayIntentBits.MessageContent, // enable if you need message content things
  ],
});

module.exports = client;


client.login(config.token || process.env.TOKEN)

client.on("ready", async() => {
  console.log("Bot aktif!")
  const Discord = require("discord.js")
const channel = config.channel
const as = client.channels.cache.get(channel)
const embed = new EmbedBuilder()
.setColor("127896")
.setAuthor({ name: `Raven | Destek Sistemi`, iconURL: as.guild.iconURL({ dynamic: true }) })
.setDescription("Sunucumuzda destek oluşturabilmek için aşağıdaki butona basıp bir kategori seçmeniz gerekiyor.")
.addFields(
     { name: '\u200B', value: '\u200B' },
     { name: "🎉 Çekiliş Kazandım ", value: "Bir çekiliş kazandıysan ödülünü burdan alacaksın.", inline: true },
     { name: "☢️ Altyapı Çalıntı Bildirimi ", value: "Biri altyapımızı çaldıysa onu sunucudan yasaklatabilirsin.", inline: true },
     { name: "⛔ Kullanıcı Bildirimi ", value: "Bir kullanıcıyı bildirirsin.", inline: true },
 )
 .setThumbnail("https://cdn.discordapp.com/attachments/1016663875342569562/1045979609965015080/ravenDestek.png")
 .setFooter({ text: "Kod destek hakkında yardım almak için '⛔・kod-destek' kanalını kullanın!", iconURL: "https://cdn.discordapp.com/attachments/1016663875342569562/1045979609965015080/ravenDestek.png" })

const row = new Discord.ActionRowBuilder()
.addComponents(
new Discord.ButtonBuilder()
.setLabel("Destek Talebi Oluştur")
.setStyle(Discord.ButtonStyle.Secondary)
.setCustomId("destek")
.setEmoji("🎫")
)
as.send({embeds: [embed], components:[row]})
})
client.on("interactionCreate", async(interaction) => {
if(interaction.customId === "destek") {
  const row = new Discord.ActionRowBuilder()
  .addComponents(
    new Discord.ButtonBuilder()
    .setEmoji("🎉")
    .setStyle(Discord.ButtonStyle.Success)
    .setCustomId("Çekiliş Kazandım"), 
    new Discord.ButtonBuilder()
    .setEmoji("☢️")
    .setStyle(Discord.ButtonStyle.Primary)
    .setCustomId("Altyapı Çalıntı Bildirimi"),
    new Discord.ButtonBuilder()
    .setEmoji("⛔")
    .setStyle(Discord.ButtonStyle.Danger)
    .setCustomId("Kullanıcı Bildirimi"),

  )
  const embed = new EmbedBuilder()
  .setDescription("Hangi kategoriyi seçmek istiyorsun?")
  .setColor("127896")
interaction.reply({embeds: [embed], components: [row], ephemeral: true}).catch(error => {})


}

const butonlar = ["Çekiliş Kazandım","Altyapı Çalıntı Bildirimi","Kullanıcı Bildirimi"]
if(butonlar.includes(interaction.customId)) {
  await interaction.deferUpdate()
  const data = db.get(`ticket_${interaction.guild.id}`) || "1"
  interaction.guild.channels.create({
             name: `ticket-${data}`,
               type: ChannelType.GuildText,

               permissionOverwrites: [
                 {
                     id: interaction.guild.id,
                     deny: [PermissionsBitField.Flags.ViewChannel]
                 },
                 {
                     id: interaction.user.id,
                     allow: [PermissionsBitField.Flags.ViewChannel]
                 },
                 {
                     id: config.staff,
                     allow: [PermissionsBitField.Flags.ViewChannel]
                 },
             ]
           })


                 .then((c)=>{

const embed = new EmbedBuilder()
.setAuthor({name: "Raven - Destek Sistemi!", iconURL: interaction.guild.iconURL()})
.setDescription("Hey, destek talebi açtığına göre önemli bir konu olmalı.Bu sürede birini etiketleme ve sakince sorununu belirt.")
.addFields(
  { name: '\u200B', value: '\u200B' },
  {name: "Kullanıcı:", value: `${interaction.user.tag}`, inline: true},
  {name: "Sebep:", value: `${interaction.customId}`, inline: true},
  {name: "Destek Sırası:", value: `${data}`, inline: true}
)
.setColor("127896")
const row = new ActionRowBuilder()
.addComponents(
  new Discord.ButtonBuilder()
  .setEmoji("📑")
  .setLabel("Kaydet Ve Kapat")
  .setStyle(Discord.ButtonStyle.Secondary)
  .setCustomId("kapat"),
  new Discord.ButtonBuilder()
  .setEmoji("<:bilgi:1026204345060036691>")
  .setLabel("Mesajlar")
  .setStyle(Discord.ButtonStyle.Secondary)
  .setCustomId("mesaj")
)
db.set(`kapat_${c.id}`, interaction.user.id)
db.add(`ticket_${interaction.guild.id}`, +1)
c.send({embeds: [embed], components: [row]}).then(a => {
a.pin()

                 })
               })
}
})

client.on("messageCreate", async(message) => {
if(message.channel.name.includes("ticket")) {
  if(message.author?.bot) return;
db.push(`mesaj_${message.channel.id}`, `${message.author.username}: ${message.content}`)
}
})
client.on("interactionCreate", async(message) => {
if(message.customId === "mesaj") {
  const fs = require("fs")
  const wait = require('node:timers/promises').setTimeout;
const datas = db.fetch(`mesaj_${message.channel.id}`)
if(!datas) {
  fs.writeFileSync(`${message.channel.id}.json`, "Bu kanalda hic bir mesaj bulunamadi!");
  message.reply({files: [`./${message.channel.id}.json`]}).catch(error => {})
}
if(datas) {
const data = db.fetch(`mesaj_${message.channel.id}`).join("\n")
fs.writeFileSync(`${message.channel.id}.json`, data);
message.reply({files: [`./${message.channel.id}.json`]}).catch(error => {})
}
}
})

process.on("unhandledRejection", async(error) => {
console.log("Bir hata olustu: "+error)

})
client.on("interactionCreate", async(interaction) => {
if(interaction.customId === "kapat") {
  const id = db.fetch(`kapat_${interaction.channel.id}`)
  const channel = interaction.channel
 channel.permissionOverwrites.edit(id, { ViewChannel: false });

                   const embed = new EmbedBuilder()
                   .setDescription("Bu destek talebi sonlandırıldı, umarım sorun çözülmüştür :)")
                   .setColor("127896")
                   await interaction.reply({embeds: [embed]})
}
})
