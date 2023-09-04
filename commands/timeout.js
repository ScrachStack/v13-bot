const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');

module.exports = {
    data: {
        name: 'timeout',
        description: 'Put a member in time-out.',
        options: [
            {
                type: 'USER',
                name: 'target',
                description: 'Meber to put in time-out',
                required: true
            },
            {
                type: 'INTEGER',
                name: 'duration',
                description: 'Duration in minutes for the time-out',
                required: true
            }
        ]
    },

    async execute(interaction) {
        const target = interaction.options.getUser('target');
        const duration = interaction.options.getInteger('duration');

        const member = interaction.guild.members.cache.get(target.id);
        if (!member.manageable) {
            return interaction.reply({ content: 'I cannot put that user in time-out.', ephemeral: true });
        }

        try {
             await member.timeout(duration * 60 * 1000);  

            const e = new MessageEmbed()
                .setColor('RED')
                .setTitle('Time-Out Action')
                .setDescription(`${target.tag} has been placed in time-out for ${duration} minutes.`)
                .setFooter(`Timed out by ${interaction.user.tag}`)
                .setTimestamp();
            await interaction.reply({ embeds: [e] });
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: 'Failed to place user in time-out. Please check the bot's perms and try again.', ephemeral: true });
        }
    }
};
