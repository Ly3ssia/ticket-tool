const { Client, EmbedBuilder, PermissionsBitField } = require("discord.js");
const mapping = {
    ' ': '   ',
    '0': ':zero:',
    '1': ':one:',
    '2': ':two:',
    '3': ':three:',
    '4': ':four:',
    '5': ':five:',
    'İ': ':regional_indicator_i:',
    'Ö': ':regional_indicator_o:',
    'ö': ':regional_indicator_o:',
    'Ş': ':regional_indicator_s:',
    'Ü': ':regional_indicator_u:',
    'Ç': ':regional_indicator_c:', 
    'ı': ':regional_indicator_i:', 
    'o': ':regional_indicator_o:',
    'ş': ':regional_indicator_s:',
    'ğ': ':regional_indicator_g:',
    'Ğ': ':regional_indicator_g:',
    'ü': ':regional_indicator_u:',
    'ç': ':regional_indicator_c:', 
    '6': ':six:',
    '7': ':seven:',
    '8': ':eight:',
    '9': ':nine:',
    '!': ':grey_exclamation:',
    '?': ':grey_question:',
    '#': ':hash:',
    '*': ':asterisk:'
    };
    
    'abcdefghijklmnopqrstuvwxyz'.split('').forEach(c => {
    mapping[c] = mapping[c.toUpperCase()] = ` :regional_indicator_${c}:`;
    });
module.exports = {
  name: "emoji-yazı",
  description: "Bota Emoji İle Yazı Yazdırırsın!",
  type: 1,
  options: [
    {
        name:"yazı",
        description:"Botun Yazacağı Yazı!",
        type:3,
        required:true
    },
  ],

  run: async(client, interaction) => {
    const yazı = interaction.options.getString("yazı")
    if (yazı.length > 50) return interaction.reply({content: `:x: En fazla 50 Harf Kullanabilirsiniz.`, ephemeral: true});
interaction.reply(yazı
.split('')
.map(c => mapping[c] || c)
.join(''))
}
};
