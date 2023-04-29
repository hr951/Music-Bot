const settings = (queue) => {
    const loop = queue.repeatMode ? (queue.repeatMode === 2 ? 'All' : 'Single') : 'Off';
    const volume = queue.node.volume;
    const track = queue.currentTrack;
    const author = track.author;
    const timestamp = queue.node.getTimestamp();
    const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;

    return `アーティスト : **${author}**\n長さ **${trackDuration}**\n`
        + `────────────────────\n`
        + `音量: \`${volume}%\` | ループ: \`${loop}\``;
};

module.exports.settings = settings;