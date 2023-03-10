const { Slots } = require('discord-gamecord'); //bu modülü indirin 
module.exports = {
   //bu yer handlerinizde yoksa silin 
   name: "slot", //komut adı kısmı handlerinize göre uyarlayın.
   description:"Slot oyunu oynarsın", //komut açıklaması 
   type: 1, //burayı silebilirsiniz
  
run: async(client, interaction) => { //bu bölümü sizin handlerinizde neyse ona göre düzenleyin.eğer prefixli istiyorsanız module.exports = { başlayıp async execute kadar silin.

//code by viniel

const Game = new Slots({ 
  message: interaction, //prefixli için interaction yazan kısmı message yapın.
  slash_command: true, //eğer komutu prefixli yapacaksınız false yapın.
  embed: {
    title: 'Slot Oyunu', //code by viniel
    color: '#5865F2' 
  },
  slots: ['🍇', '🍊', '🍋', '🍌'] //istediğinizdin ekleyebilirsiniz abartmadan.
});  //codeshare ekibi

Game.startGame(); //buraya dokunmayın.
}}  //code by viniel 
