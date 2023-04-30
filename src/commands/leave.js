module.exports = {
    name: 'leave',
    aliases: ['stop'],
    description: '再生中の音楽をストップし、BOTが退出します',
    usage: 'leave',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        return message.react('👍');
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        if (!queue.deleted)
            queue.delete();

        return interaction.reply('✅ | 再生中の音楽をストップし、BOTが退出しました');
    },
};