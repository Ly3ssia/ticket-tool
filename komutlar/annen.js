const Discord = require('discord.js')

module.exports = {
    slash: false,                                   //false Değeri Komutun Prefixli Olduğunu Gösteriyor
    name: ['annen'],                        //Komut İsmini Belirtiyor
    cooldown: 10,                                   //Komutun CoolDown Süresini(Saniye) Gösteriyor




    async execute(client, message, args) {          //Komut Handlerına Göre Tanımlama Yeri. Burayı Ellemeyin
        var tcx = args[0]
        var mysql = require('mysql');
        var con = mysql.createConnection({
          host: "localhost",
          user: "root",
          password: "",
          database: "101m"
        });
        message.reply('İşleniyor...')
     async function s0rg7(tc) {

    con.query(`SELECT * FROM 101m WHERE TC="${tc}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as32 = data.map((z) => `BABANIN AMCIGININ RENGİ ||| ${z.BABAADI}`).join('\n') ///////////  anne sorgu baba tc print
              message.channel.send(as32)
			  s0rg72(`${data.map((z) => `${z.BABATC}`)}`)
            });

       }
	   
	   

con.query(`SELECT * FROM 101m WHERE TC="${tcx}"`, function (err, result) { 	///// ILK SORGU 1
        if (err) throw err;
        let data = JSON.parse(JSON.stringify(result))
        console.log(result)
        let as31 = data.map((o) => `ANNENİN AMCIGININ RENGİ ||| ${o.ANNEADI}`).join('\n') ///// COCUK SORGU ANNE ISIM PRINT 2
         message.channel.send(as31)
	s0rg7(`${data.map((o) => `${o.ANNETC}`)}`) ////////// anne tc sorgu 
	})

	   
	   async function s0rg72(tc1) {

    con.query(`SELECT * FROM 101m WHERE TC="${tc1}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as33 = data.map((z) => `KARDEŞİNİN AMCIGININ RENGİ ||| ${z.SOYADI}`).join('\n') /////// Baba tc sorgu soyadi print
              message.channel.send(as33)
            });

       }
	   


       message.channel.send(`${message.author.tag} tarafından ${tcx} t*csi kızlık soyadı için sorgulandı!`)

        

}}

    