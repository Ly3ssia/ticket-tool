const { EmbedBuilder, ApplicationCommandType } = require('discord.js');

module.exports = {
	name: 'rol',
	description: "Rolleri yönetme",
	cooldown: 3000,
	type: ApplicationCommandType.ChatInput,
    	default_member_permissions: 'ManageRoles',
	options: [
        {
            name: 'ekle',
            description: 'Eklenilecek olan rol',
            type: 1,
            options: [
                {
                    name: 'rol',
                    description: 'Eklenecek olan rolü seç',
                    type: 8,
                    required: true
                },
                {
                    name: 'kim',
                    description: 'Kime eklenecek',
                    type: 6,
                    required: true
                }
            ]
        }
    ],
	run: async (client, interaction) => {
	 if(interaction.options._subcommand === 'ekle') {
            try {
                const member = interaction.guild.members.cache.get(interaction.options.get('kim').value);
                const role = interaction.options.get('rol').role;
    
                await member.roles.add(role.id);
                const embed = new EmbedBuilder()
                .setTitle('Rol eklendi')
                .setDescription(`Başarıyla ekledim: ${role} - ${member}`)
                .setColor('Green')
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL())
                .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL() });
        
                return interaction.reply({ embeds: [embed] })
            } catch {
                return interaction.reply({ content: `Üzgünüm, rolü eklerken hata oluştu`, ephemeral: true });
            }

        }
    }
};