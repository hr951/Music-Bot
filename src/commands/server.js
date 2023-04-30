const embed = require('../embeds/embeds');


module.exports = {
    name: 'server',
    aliases: [],
    showHelp: false,
    description: `${bot_name}が導入されているサーバーの情報を表示します`,
    usage: 'server',
    options: [],

    execute(client, message) {
        let serverlist = '';
        serverlist = client.guilds.cache
            .map(g => `サーバー名: ${g.name}\n メンバー数: ${g.memberCount}`)
            .join('\n\n');

        return message.reply({ embeds: [embed.Embed_server(serverlist)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        let serverlist = '';
        serverlist = client.guilds.cache
            .map(g => `サーバー名: ${g.name}\n メンバー数: ${g.memberCount}`)
            .join('\n\n');

        return interaction.reply({ embeds: [embed.Embed_server(serverlist)], allowedMentions: { repliedUser: false } });
    },
};