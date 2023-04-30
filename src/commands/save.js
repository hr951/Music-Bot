const embed = require('../embeds/embeds');


module.exports = {
    name: 'save',
    aliases: [],
    description: '現在再生中の音楽の情報をDMに送信します',
    usage: 'save',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません `, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `アーティスト : **${track.author}**\n長さ **${trackDuration}**`;

        message.author.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
            //message.author.send(`Registered track: **${track.title}** | ${track.author}, Saved server: **${message.guild.name}** ✅`)
            .then(() => {
                message.react('👍');
            })
            .catch(error => {
                console.log('error: ' + error);
                message.react('❌');
            });
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません `, allowedMentions: { repliedUser: false } });


        const track = queue.currentTrack;
        const timestamp = queue.node.getTimestamp();
        const trackDuration = timestamp.progress == 'Forever' ? 'Endless (Live)' : track.duration;
        let description = `アーティスト : **${track.author}**\n長さ **${trackDuration}**`;

        interaction.user.send({ embeds: [embed.Embed_save(track.title, track.url, track.thumbnail, description)] })
            .then(() => {
                interaction.reply("✅ | 音楽の情報をDMに送りました")
            })
            .catch(error => {
                console.log('error: ' + error);
                interaction.reply("❌ | 音楽の情報を送れませんでした")
            });
    },
};