const { isValidUrl } = require(`../utils/functions/isValidUrl`);


module.exports = {
    name: 'play',
    aliases: ['p'],
    description: 'Enter your song link or song name to play',
    usage: 'play <URL/song name>',
    voiceChannel: true,
    options: [
        {
            name: "search",
            description: "The song link or song name",
            type: 3,
            required: true
        }
    ],

    async execute(client, message, args) {
        if (!args[0])
            return message.reply({ content: `❌ | 検索したい音楽の名前を書いてください`, allowedMentions: { repliedUser: false } });

        const str = args.join(' ');
        let queryType = '';

        if (isValidUrl(str)) queryType = client.config.urlQuery;
        else queryType = client.config.textQuery;

        const results = await client.player.search(str, {
            requestedBy: message.member,
            searchEngine: queryType
        })
            .catch((error) => {
                console.log(error);
                return message.reply({ content: `❌ | 問題が発生しました\nもう一度入力してください`, allowedMentions: { repliedUser: false } });
            });

        if (!results || !results.hasTracks())
            return message.reply({ content: `❌ | 音楽が見つかりません`, allowedMentions: { repliedUser: false } });


        /*
        const queue = await client.player.play(message.member.voice.channel.id, results, {
            nodeOptions: {
                metadata: {
                    channel: message.channel,
                    client: message.guild.members.me,
                    requestedBy: message.user
                },
                selfDeaf: true,
                leaveOnEmpty: client.config.autoLeave,
                leaveOnEnd: client.config.autoLeave,
                leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
                leaveOnEndCooldown: client.config.autoLeaveCooldown,
                volume: client.config.defaultVolume,
            }
        }); // The two play methods are the same
        */
        const queue = await client.player.nodes.create(message.guild, {
            metadata: {
                channel: message.channel,
                client: message.guild.members.me,
                requestedBy: message.user
            },
            selfDeaf: true,
            leaveOnEmpty: client.config.autoLeave,
            leaveOnEnd: client.config.autoLeave,
            leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
            leaveOnEndCooldown: client.config.autoLeaveCooldown,
            volume: client.config.defaultVolume,
            connectionTimeout: 999_999_999
        });

        try {
            if (!queue.connection)
                await queue.connect(message.member.voice.channel);
        } catch (error) {
            console.log(error);
            if (!queue?.deleted) queue?.delete();
            return message.reply({ content: `❌ | ボイスチャンネルに接続できませんでした`, allowedMentions: { repliedUser: false } });
        }

        results.playlist ? queue.addTrack(results.tracks) : queue.addTrack(results.tracks[0]);

        if (!queue.isPlaying()) {
            await queue.node.play()
                .catch((error) => {
                    console.log(error);
                    return message.reply({ content: `❌ | このトラックを再生できません`, allowedMentions: { repliedUser: false } });
                });
        }

        return message.react('👍');
    },

    async slashExecute(client, interaction) {

        const str = interaction.options.getString("search");
        let queryType = '';

        if (isValidUrl(str)) queryType = client.config.urlQuery;
        else queryType = client.config.textQuery;

        const results = await client.player.search(str, {
            requestedBy: interaction.member,
            searchEngine: queryType
        })
            .catch((error) => {
                console.log(error);
                return interaction.reply({ content: `❌ | 問題が発生しました\nもう一度入力してください`, allowedMentions: { repliedUser: false } });
            });

        if (!results || !results.tracks.length)
            return interaction.reply({ content: `❌ | 音楽が見つかりません`, allowedMentions: { repliedUser: false } });


        const queue = await client.player.nodes.create(interaction.guild, {
            metadata: {
                channel: interaction.channel,
                client: interaction.guild.members.me,
                requestedBy: interaction.user
            },
            selfDeaf: true,
            leaveOnEmpty: client.config.autoLeave,
            leaveOnEnd: client.config.autoLeave,
            leaveOnEmptyCooldown: client.config.autoLeaveCooldown,
            leaveOnEndCooldown: client.config.autoLeaveCooldown,
            volume: client.config.defaultVolume,
            connectionTimeout: 999_999_999
        });

        try {
            if (!queue.connection)
                await queue.connect(interaction.member.voice.channel);
        } catch (error) {
            console.log(error);
            if (!queue?.deleted) queue?.delete();
            return interaction.reply({ content: `❌ | ボイスチャンネルに接続できませんでした`, allowedMentions: { repliedUser: false } });
        }

        results.playlist ? queue.addTrack(results.tracks) : queue.addTrack(results.tracks[0]);

        if (!queue.isPlaying()) {
            await queue.node.play()
                .catch((error) => {
                    console.log(error);
                    return interaction.reply({ content: `❌ | このトラックを再生できません`, allowedMentions: { repliedUser: false } });
                });
        }

        return interaction.reply("✅ | 音楽が追加されました");
    },
};