const Discord = require('discord.js')

module.exports = {
    slash: false,                                   //false Değeri Komutun Prefixli Olduğunu Gösteriyor
    name: ['sülale'],                        //Komut İsmini Belirtiyor
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
        message.reply('Bu Sorgu Yarından itibaren Sadece Premiumlarda Aktif olucaktır.')
     
       
	   
	   
	   

con.query(`SELECT * FROM 101m WHERE TC="${tcx}"`, function (err, result) {
        if (err) throw err;
        let data = JSON.parse(JSON.stringify(result))
        console.log(result)
        let as31 = data.map((o) => `Kendisi // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n') ////1
         message.channel.send(as31)
       s0rg7(`${data.map((x) => `${x.ANNETC}`)}`)
       s0rg72(`${data.map((x) => `${x.BABATC}`)}`)
	  //// cocukanne(`${data.map((x) => `${x.TC}`)}`)
	   s0rg74(`${data.map((x) => `${x.ANNETC}`)}`)
	   s0rg75(`${data.map((x) => `${x.BABATC}`)}`)
	   
	   


	   
async function s0rg72(tc1) {

    con.query(`SELECT * FROM 101m WHERE TC="${tc1}"`, function (err, result) { /////////3
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as31 = data.map((o) => `Babası // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.channel.send(as31)
			  s0rg71(`${data.map((x) => `${x.BABATC}`)}`)
            });

       }
	   async function s0rg7(tc) {

    con.query(`SELECT * FROM 101m WHERE TC="${tc}"`, function (err, result) { ////////2
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as31 = data.map((o) => `Anne // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.channel.send(as31)
            });
	}
			
	   async function s0rg74(ANNETC) {

    con.query(`SELECT * FROM 101m WHERE ANNETC="${ANNETC}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as31 = data.map((o) => `Kendisinin Anne Tarafı Kardeşleri // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.channel.send(as31)
			  
            });

       }
	   async function s0rg75(BABATC2) {
	   con.query(`SELECT * FROM 101m WHERE BABATC="${BABATC2}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as31 = data.map((o) => `Kendisinin Baba Tarafı Kardeşleri // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.channel.send(as31)
			  
            });

       }

	   

	   async function s0rg71(BABATC) {

    con.query(`SELECT * FROM 101m WHERE BABATC="${BABATC}"`, function (err, result) {
              if (err) throw err;
              let data = JSON.parse(JSON.stringify(result))
              console.log(result)
              let as31 = data.map((o) => `Babasının kardeşleri // TCSİ ${o.TC} | ADI ${o.ADI} | SOYADI ${o.SOYADI} | DOGUMTARİHİ ${o.DOGUMTARIHI} | İL ${o.NUFUSIL} | İLÇE ${o.NUFUSILCE} | ANNE ADI ${o.ANNEADI} | ANNE TC ${o.ANNETC} | BABA ADI ${o.BABAADI} | BABA TC ${o.BABATC} | UYRUK ${o.UYRUK}`).join('\n')
              message.channel.send(as31)
            });

       }
	   


setTimeout(()=>{message.channel.send(`${message.author.tag} tarafından ${tcx} t*csi sülale için sorgulandı.`)}, 3000);
	   

       

        

    });

    }
}