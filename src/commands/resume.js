module.exports = {
    name: 'resume',
    aliases: [],
    description: '一時停止した音楽を再生します',
    usage: 'resume',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue)
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        const success = queue.node.resume();
        return success ? message.react('▶️') : message.reply({ content: `❌ | どこかで間違っています`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue)
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        const success = queue.node.resume();
        return success ? interaction.reply("▶️ | 音楽が再生されます") : interaction.reply({ content: `❌ | どこかで間違っています`, allowedMentions: { repliedUser: false } });
    },
};