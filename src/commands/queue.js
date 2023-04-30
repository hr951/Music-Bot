const embed = require('../embeds/embeds');


module.exports = {
    name: 'queue',
    aliases: ['q', 'list'],
    description: '再生リストを表示します',
    usage: 'queue',
    voiceChannel: true,
    options: [],

    execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.currentTrack)
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        let nowplaying = `再生中の音楽 : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length < 1) {
            tracksQueue = '------------------------------';
        }
        else if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nand ${tracks.length - 10} other songs`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';
        return message.reply({ embeds: [embed.Embed_queue("再生リスト", nowplaying, tracksQueue, loopStatus)], allowedMentions: { repliedUser: false } });
    },

    slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.currentTrack)
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        const tracks = queue.tracks.map((track, index) => `${++index}. ${track.title}`);

        let nowplaying = `再生中の音楽 : ${queue.currentTrack.title}\n\n`;
        let tracksQueue = '';

        if (tracks.length < 1) {
            tracksQueue = '------------------------------';
        }
        else if (tracks.length > 9) {
            tracksQueue = tracks.slice(0, 10).join('\n');
            tracksQueue += `\nand ${tracks.length - 10} other songs`;
        }
        else {
            tracksQueue = tracks.join('\n');
        }

        let loopStatus = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'One') : 'Off';
        return interaction.reply({ embeds: [embed.Embed_queue("再生リスト", nowplaying, tracksQueue, loopStatus)] });
    },
};