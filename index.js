const { Client, GatewayIntentBits, Partials } = require("discord.js");
const INTENTS = Object.values(GatewayIntentBits);
const PARTIALS = Object.values(Partials);
const Discord = require("discord.js")
const db = require("croxydb")
const client = new Client({
    intents: INTENTS,
    allowedMentions: {
        parse: ["users"]
    },
    partials: PARTIALS,
    retryLimit: 3
});

global.client = client;
client.commands = (global.commands = []);

const { readdirSync } = require("fs")
const { TOKEN } = require("./config.json");
readdirSync('./commands').forEach(f => {
  if(!f.endsWith(".js")) return;

 const props = require(`./commands/${f}`);

 client.commands.push({
       name: props.name.toLowerCase(),
       description: props.description,
       options: props.options,
       dm_permission: props.dm_permission,
       type: 1
 });

console.log(`[COMMAND] ${props.name} komutu yüklendi.`)

});
readdirSync('./events').forEach(e => {

  const eve = require(`./events/${e}`);
  const name = e.split(".")[0];

  client.on(name, (...args) => {
            eve(client, ...args)
        });
console.log(`[EVENT] ${name} eventi yüklendi.`)
});


client.login(TOKEN)

client.on("guildMemberAdd", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:inbox_tray: | ${member} sunucuya katıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", async message => {
  const db = require("croxydb");

  if (await db.get(`afk_${message.author.id}`)) {
   
    db.delete(`afk_${message.author.id}`);

    message.reply("Afk Modundan Başarıyla Çıkış Yaptın!");
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.get(`afk_${kullanıcı.id}`);

  if (sebep) {
    message.reply("Etiketlediğin Kullanıcı **"+sebep+"** Sebebiyle Afk Modunda!");
  }
});
client.on("guildMemberAdd", member => {
  const rol = db.get(`otorol_${member.guild.id}`)
  if(!rol) return;
  member.roles.add(rol).catch(() => {})

})
client.on("guildMemberAdd", member => {
  const tag = db.get(`ototag_${member.guild.id}`)
  if(!tag) return;
  member.setNickname(`${tag} | ${member.displayName}`)
})
client.on("guildMemberRemove", member => {
  const kanal = db.get(`hgbb_${member.guild.id}`)
  if(!kanal) return;
  member.guild.channels.cache.get(kanal).send({content: `:outbox_tray: | ${member} sunucudan ayrıldı! Sunucumuz **${member.guild.memberCount}** kişi oldu.`})
})

client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let kufur = db.fetch(`kufurengel_${message.guild.id}`)
  if(!kufur) return;
  
  if(kufur) {
  const kufurler = [
    
    "amk",
    "piç",
    "yarrak",
    "oç",
    "göt",
    "amq",
    "yavşak",
    "amcık",
    "amcı",
    "orospu",
    "sikim",
    "sikeyim",
    "aq",
    "mk"
       
  ]
  
if(kufurler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Şşşt! <@${message.author.id}>, Bu Sunucuda Küfür Engel Sistemi Aktif!`)
}
}
})
client.on("messageCreate", (message) => {
  const db = require("croxydb")
  let reklamlar = db.fetch(`reklamengel_${message.guild.id}`)
  if(!reklamlar) return;
  
  if(reklamlar) {

  const linkler = [
    
    ".com.tr",
    ".net",
    ".org",
    ".tk",
    ".cf",
    ".gf",
    "https://",
    ".gq",
    "http://",
    ".com",
    ".gg",
    ".porn",
    ".edu",
    "web."
       
  ]
  
if(linkler.some(alo => message.content.toLowerCase().includes(alo))) {
message.delete()
message.channel.send(`Şşşt! <@${message.author.id}>, Bu Sunucuda Reklam Engel Sistemi Aktif!`)
}
}
})

client.on("messageCreate", (message) => {
  
  let saas = db.fetch(`saas_${message.guild.id}`)
  if(!saas) return;
  
  if(saas) {
  
  let selaamlar = message.content.toLowerCase()  
if(selaamlar === 'sa' || selaamlar === 'slm' || selaamlar === 'sea' || selaamlar === ' selamünaleyküm' || selaamlar === 'Selamün Aleyküm' || selaamlar === 'selam'){

message.channel.send(`<@${message.author.id}> Aleykümselam, Hoşgeldin 👋`)
}
}
})
client.on("interactionCreate", async interaction => {
  if (!interaction.isButton()) return;
  let message = await interaction.channel.messages.fetch(interaction.message.id)  
  if(interaction.customId == "moderasyon") {
const embed = new Discord.EmbedBuilder()
.setTitle("Yardım Menüsü!")
.setDescription("/ban-list - **Banlı Kullanıcıları Gösterir!**\n/ban - **Bir Üyeyi Yasaklarsın!**\n/emojiler - **Emojileri Görürsün!**\n/forceban - **ID İle Bir Kullanıcıyı Yasaklarsın!**\n/giriş-çıkış - **Giriş çıkış kanalını ayarlarsın!**\n/kanal-açıklama - **Kanalın Açıklamasını Değiştirirsin!**\n/kick - **Bir Üyeyi Atarsın!**\n/küfür-engel - **Küfür Engel Sistemini Açıp Kapatırsın!**\n/oto-rol - **Otorolü Ayarlarsın!**\n/oto-tag - **Oto Tagı Ayarlarsın!**\n/oylama - **Oylama Açarsın!**\n/reklam-engel - **Reklam Engel Sistemini Açarsın!**\n/rol-al - **Rol Alırsın**\n/rol-oluştur - **Rol Oluşturursun!**\n/rol-ver - **Rol Verirsin!**\n/sa-as - **Selam Sistemine Bakarsın!**\n/temizle - **Mesaj Silersin!**\n/unban - **Bir üyenin yasağını kaldırırsın!**")
.setColor("Random")
interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kayıt") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Yardım Menüsü!")
    .setDescription("/kayıtlı-rol - **Kayıtlı Rolünü Ayarlarsın!**\n/kayıt-et - **Bir Üyeyi Kayıt Edersin!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
  if(interaction.customId == "kullanıcı") {
    const embed = new Discord.EmbedBuilder()
    .setTitle("Yardım Menüsü!")
    .setDescription("/avatar - **Bir Kullanıcının Avatarına Bakarsın!**\n/afk - **Sebepli Afk Olursun!**\n/emoji-yazı - **Bota Emoji İle Yazı Yazdırırsın!**\n/istatistik - **Bot istatistiklerini gösterir!**\n/kurucu-kim - **Kurucuyu Gösterir!**\n/ping - **Botun pingini gösterir!**\n/yardım - **Yardım Menüsünü Gösterir!**\n/slot - **Slot Oyunu Oynarsın!**")
    .setColor("Random")
    interaction.reply({embeds: [embed], components: [], ephemeral: true})
  }
})