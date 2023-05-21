# Discord.js Music Bot
このプロジェクトは<a href="https://github.com/hmes98318">hmes98318</a>様の<a href="https://github.com/hmes98318/Music-Disc">Music-Disc</a>を和訳したものです。<br>

<h1>YouTube、Spotify、SoundCloud、AppleMusicが使用可能です。</h1>
<br>
<br>
<h3>使い方</h3>
<h5>最重要事項(絶対書かないといけない)</h5><br>
.envの<br>
TOKEN…DiscordBotのトークンを入れる<br>
<h5>任意事項(別に入れなくても動く)</h5><br>
.envの<br>
BOT_NAME…DiscordBotの名前を記入(初期はMusic Disc)<br>
PREFIX…コマンドの前に付く"/"の代用を入れる(初期は"+")<br>
PLAYING…DiscordBotのステータスメッセージを変更できる<br>
EMBEDS_COLOR…Botのembedの左端の色を変えれる(初期は#FFFFFF(白))<br>
<h5>いじらなくていい.env</h5><br>
DEFAULT_VOLUME…Botのデフォルトの音量を変えれる<br>
MAX_VOLUME…Botのマックスの音量を変えれる<br>
AUTO_LEAVE…音楽を再生し終わったときに自動で抜けるかどうかを変えれる<br>4
AUTO_LEAVE_COOLDOWN…音楽を再生し終わってから何ms後に抜けるかどうか(AUTO_LEAVEがtrueであることが条件)<br>
DISPLAY_VOICE_STATE…いまいちわからない(いじるな)<br>
PORT…いじるな！<br>
TEXT_QUERY_TYPE…テキスト検索のデフォルト検索アプリを変更できる(下の5つに変更できる)<br>
    <pre>
      autoSearch, youtubeSearch, spotifySearch, soundcloudSearch, appleMusicSearch
    </pre><br>
URL_QUERY_TYPE…上のURL版(下の5つに変更できる)<br>
    <pre>
      auto, youtube, spotifySong soundcloud, appleMusicSong
    </pre><br>
DP_FORCE_YTDL_MOD…いじるな！
