const embed = require('../embeds/embeds');


module.exports = {
    name: 'remove',
    aliases: ['r'],
    description: 'Select a song to remove from the playlist',
    usage: 'remove <song index number>',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        if (tracks.length < 1)
            return message.reply({ content: `❌ | 現在の音楽が再生リストの最後です`, allowedMentions: { repliedUser: false } });


        let nowplaying = `再生中の音楽 : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nand ${tracks.length - 10} other songs`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        const instruction = `再生リストから削除したい音楽を **1** ～ **${tracks.length}** で入力してください\n数字以外を入力するとキャンセルできます ⬇️`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'ONE') : 'Off';
        await message.reply({ content: instruction, embeds: [embed.Embed_queue("再生リスト", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });


        const collector = message.channel.createMessageCollector({
            time: 10000, // 10s
            errors: ['time'],
            filter: m => m.author.id === message.author.id
        });

        collector.on('collect', async (query) => {

            const index = parseInt(query.content);

            if (!index || index <= 0 || index > tracks.length) {
                return message.reply({ content: `✅ | キャンセルされました`, allowedMentions: { repliedUser: false } })
                    && collector.stop();
            }

            collector.stop();
            await queue.node.remove(index - 1);

            query.reply({ embeds: [embed.Embed_remove("再生リストから削除された音楽", tracks[index - 1])], allowedMentions: { repliedUser: false } });
            return query.react('👍');
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
                return message.reply({ content: `❌ | 時間切れです\nもう一度入力してください`, allowedMentions: { repliedUser: false } });
        });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        if (tracks.length < 1)
            return interaction.reply({ content: `❌ | 現在の音楽が再生リストの最後です`, allowedMentions: { repliedUser: false } });


        let nowplaying = `再生中の音楽 : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nand ${tracks.length - 10} other songs`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        const instruction = `再生リストから削除したい音楽を **1** ～ **${tracks.length}** で入力してください\n数字以外を入力するとキャンセルできます ⬇️`;
        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'ONE') : 'Off';
        await interaction.reply({ content: instruction, embeds: [embed.Embed_queue("再生リスト", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });


        const collector = interaction.channel.createMessageCollector({
            time: 10000, // 10s
            errors: ['time'],
            filter: m => m.author.id === interaction.user.id
        });

        collector.on('collect', async (query) => {
            const index = parseInt(query.content);

            if (!index || index <= 0 || index > tracks.length) {
                return query.reply({ content: `✅ | キャンセルされました`, allowedMentions: { repliedUser: false } })
                    && collector.stop();
            }

            collector.stop();
            await queue.node.remove(index - 1);

            query.reply({ embeds: [embed.Embed_remove("再生リストから削除された音楽", tracks[index - 1])], allowedMentions: { repliedUser: false } });
            return query.react('👍');
        });

        collector.on('end', (msg, reason) => {
            if (reason === 'time')
                return interaction.reply({ content: `❌ | 時間切れです\nもう一度入力してください`, allowedMentions: { repliedUser: false } });
        });
    },
};