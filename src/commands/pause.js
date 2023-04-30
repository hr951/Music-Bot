module.exports = {
    name: 'pause',
    aliases: [],
    description: '音楽を一時停止します',
    usage: 'pause',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        const success = queue.node.pause();
        return success ? message.react('⏸️') : message.reply({ content: `❌ | どこかで間違っています`, allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        const success = queue.node.pause();
        return success ? interaction.reply("⏸️ | 音楽を一時停止しました") : interaction.reply({ content: `❌ | どこかで間違っています`, allowedMentions: { repliedUser: false } });
    },
};