module.exports = {
    name: 'volume',
    aliases: ['v'],
    description: `Configure bot volume`,
    usage: 'v <0-100>',
    voiceChannel: true,
    options: [
        {
            name: "volume",
            description: "The volume to set",
            type: 4,
            required: true,
            min_value: 1
        }
    ],

    async execute(client, message, args) {
        const maxVolume = client.config.maxVolume;
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        await message.react('👍');
        const vol = parseInt(args[0], 10);

        if (!vol)
            return message.reply({ content: `現在の音量: **${queue.node.volume}** 🔊\n**音量を変更するには \`1\` ～ \`${maxVolume}\` の数字を入力してください**`, allowedMentions: { repliedUser: false } });

        if (queue.volume === vol)
            return message.reply({ content: `❌ | その音量は現在の音量と同じです`, allowedMentions: { repliedUser: false } });

        if (vol < 0 || vol > maxVolume)
            return message.reply({ content: `❌ | **音量を変更するには \`1\` ～ \`${maxVolume}\` の数字を入力してください**`, allowedMentions: { repliedUser: false } });


        const success = queue.node.setVolume(vol);
        const replymsg = success ? `🔊 **${vol}**/**${maxVolume}**%` : `❌ | どこかで間違っています`;
        return message.reply({ content: replymsg, allowedMentions: { repliedUser: false } });
    },

    async slashExecute(client, interaction) {
        const maxVolume = client.config.maxVolume;
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });

        const vol = parseInt(interaction.options.getInteger("volume"), 10);

        if (!vol)
            return interaction.reply({ content: `現在の音量: **${queue.node.volume}** 🔊\n**音量を変更するには \`1\` ～ \`${maxVolume}\` の数字を入力してください**`, allowedMentions: { repliedUser: false } });

        if (queue.volume === vol)
            return interaction.reply({ content: `❌ | その音量は現在の音量と同じです`, allowedMentions: { repliedUser: false } });

        if (vol < 0 || vol > maxVolume)
            return interaction.reply({ content: `❌ | **音量を変更するには \`1\` ～ \`${maxVolume}\` の数字を入力してください**`, allowedMentions: { repliedUser: false } });


        const success = queue.node.setVolume(vol);
        const replymsg = success ? `🔊 **${vol}**/**${maxVolume}**%` : `❌ | どこかで間違っています`;
        return interaction.reply({ content: replymsg, allowedMentions: { repliedUser: false } });
    },
};