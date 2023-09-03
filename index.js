const TOKEN = 'EDIT-HERE';
/* JOIN https://discord.gg/cfxdev for support! */ 
const { Client, Intents, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });
client.commands = new Collection();
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.data.name, command);
}
client.once('ready', async () => {
    const guildIDs = ['GUILDID']; // You can add more than one just do '',

    guildIDs.forEach(guildID => {
        const guild = client.guilds.cache.get(guildID);
        if (guild) {
            console.log(`[Z]: Commands Loaded In These servers. ${guild.name}`);
            guild.commands.set(Array.from(client.commands.values()).map(command => command.data))
                .catch(err => {
                    console.error(`[Z]: Failed to set commands for these servers. ${guild.name}:`, err);
                });
        } else {
            console.log(`[Z]: These Servers were not found! ${guildID} not found.`);
        }
    });
});
client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = client.commands.get(interaction.commandName);
    if (!command) return;
    try {
        await command.execute(interaction, client);
    } catch (error) {
        console.error(error);
        await interaction.reply({ content: 'An error occurred while executing this command!', ephemeral: true });
    }
});
const { MessageEmbed, MessageButton,MessageActionRow } = require('discord.js');


client.login(TOKEN);
