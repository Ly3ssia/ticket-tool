const request = require('request');

module.exports = {
  name: "sohbet",
  description: "Yapay Zeka Sohbeti",
  type: 1,

run: async(client, message, args) => {

let mesaj = args.slice(0).join(' ');
if (mesaj.length < 1) return message.reply('Bir şeyler yazmalısın.');

    request.get(`http://api.kenucorp.com/ai/api.php?uid=${message.author.id}&msg=${mesaj}`, (err, response, body) => {
      const veri = body.split(':"').pop().split('"}')[0];
        if (veri === "(Zaman aşımı)") {
          return message.reply("Bir hata oluştu. Lütfen daha sonra tekrar deneyin.");
        } else {
            return message.reply(veri);
        }
      })

}
  }