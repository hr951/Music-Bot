const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

const embed = require('../embeds/embeds');
const { button } = require('../utils/constants');
const { settings } = require('../utils/player/settings');


module.exports = {
    name: 'dashboard',
    aliases: ['d', 'main'],
    description: '音楽の情報を表示します',
    usage: 'dashboard',
    voiceChannel: true,
    options: [],

    async execute(client, message) {
        const queue = client.player.nodes.get(message.guild.id);

        if (!queue || !queue.isPlaying())
            return message.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        try {
            await queue.dashboard.delete();
        } catch (error) {
            console.log('Dashboard delete error:', error);
        }

        let playing = queue.node.isPaused();

        const playPauseButton = new ButtonBuilder().setCustomId('Playing-PlayPause').setLabel(playing ? button.play : button.pause).setStyle(ButtonStyle.Secondary);
        const skipButton = new ButtonBuilder().setCustomId('Playing-Skip').setLabel(button.skip).setStyle(ButtonStyle.Secondary);
        const stopButton = new ButtonBuilder().setCustomId('Playing-Stop').setLabel(button.stop).setStyle(ButtonStyle.Danger);
        const loopButton = new ButtonBuilder().setCustomId('Playing-Loop').setLabel(button.loop).setStyle(ButtonStyle.Secondary);
        const shuffleButton = new ButtonBuilder().setCustomId('Playing-Shuffle').setLabel(button.shuffle).setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder().addComponents(playPauseButton, skipButton, stopButton, loopButton, shuffleButton);

        const cur = queue.currentTrack;
        queue.dashboard = await queue.metadata.channel.send({ embeds: [embed.Embed_dashboard('音楽の情報', cur.title, cur.url, cur.thumbnail, settings(queue))], components: [row] });
        return await message.react('👍');
    },

    async slashExecute(client, interaction) {
        const queue = client.player.nodes.get(interaction.guild.id);

        if (!queue || !queue.isPlaying())
            return interaction.reply({ content: `❌ | 現在再生中の音楽はありません`, allowedMentions: { repliedUser: false } });


        try {
            await queue.dashboard.delete();
        } catch (error) {
            console.log('Dashboard delete error:', error);
        }

        let playing = queue.node.isPaused();

        const playPauseButton = new ButtonBuilder().setCustomId('Playing-PlayPause').setLabel(playing ? button.play : button.pause).setStyle(ButtonStyle.Secondary);
        const skipButton = new ButtonBuilder().setCustomId('Playing-Skip').setLabel(button.skip).setStyle(ButtonStyle.Secondary);
        const loopButton = new ButtonBuilder().setCustomId('Playing-Loop').setLabel(button.loop).setStyle(ButtonStyle.Secondary);
        const stopButton = new ButtonBuilder().setCustomId('Playing-Stop').setLabel(button.stop).setStyle(ButtonStyle.Danger);
        const shuffleButton = new ButtonBuilder().setCustomId('Playing-Shuffle').setLabel(button.shuffle).setStyle(ButtonStyle.Secondary);
        const row = new ActionRowBuilder().addComponents(playPauseButton, skipButton, loopButton, stopButton, shuffleButton);

        const cur = queue.currentTrack;
        queue.dashboard = await queue.metadata.channel.send({ embeds: [embed.Embed_dashboard('音楽の情報', cur.title, cur.url, cur.thumbnail, settings(queue))], components: [row] });
        return await interaction.reply("✅ | ダッシュボードが更新されました");
    },
};