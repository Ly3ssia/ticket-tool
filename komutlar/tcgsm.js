const Discord = require('discord.js')

module.exports = {
    slash: false,                                   //false Değeri Komutun Prefixli Olduğunu Gösteriyor
    name: ['tcgsm'],                        //Komut İsmini Belirtiyor
    cooldown: 10,                                   //Komutun CoolDown Süresini(Saniye) Gösteriyor




    async execute(client, message, args) {          //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin
        var tcx = args[0]
        var mysql = require('mysql');
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "gsm"
        });
        message.reply('Sorgulatdığınız kişi aranıyor lütfen sabırlı olunuz.')
        con.query(`SELECT * FROM illegalplatform_hackerdede1_gsm WHERE TC="${tcx}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))

              console.log(result)
              /*let ckt = new Discord.MessageAttachment ({
                attachment: Buffer.from('helo'),
                name: 'helo.txt'
              })
            message.reply({  files: [ckt] })*/
              let as31 = data.map((o) => ` TELEFON NUMARASI ${o.GSM} TCSI ${o.TC}`).join('\n')
              message.reply(`:tada: ${tcx} isminde **${data.length}** kişi bulundu.`)
              let dosyahazırla = new Discord.MessageAttachment(Buffer.from(as31), `dracocheck.txt`);
              message.reply({ files: [ dosyahazırla ] })
              message.channel.send(`${message.author.tag} tarafından ${tcx} buldun la hadi yine iyisin ;).`)
            }); 
            
    }
}