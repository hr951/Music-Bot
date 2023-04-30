module.exports = {
    name: 'back',
    aliases: ['b', 'rewind'],
    description: 'ひとつ前の音楽を再生します',
    usage: 'back',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        if (!queue.history.previousTrack)
            return message.reply({ content: `❌ | 以前再生していた音楽はありません`, allowedMentions: { repliedUser: false } });

        await queue.history.back();
        return await message.react('👍');
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        if (!queue.history.previousTrack)
            return interaction.reply({ content: `❌ | 以前再生していた音楽はありません`, allowedMentions: { repliedUser: false } });

        await queue.history.back();
        return await interaction.reply("✅ | ひとつ前の音楽を再生します");
    },
};