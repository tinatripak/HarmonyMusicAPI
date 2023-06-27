class SuggestedSongClass {
  constructor(obj) {
    this.userName = obj.userName;
    this.email = obj.email;
    this.songName = obj.songName;
    this.songImage = obj.songImage;
    this.songAudio = obj.songAudio;
    this.songLanguage = obj.songLanguage;
    this.songCategory = obj.songCategory;
    this.songYear = obj.songYear;
    this.singerName = obj.singerName;
    this.singerImage = obj.singerImage;
    this.singerTwitter = obj.singerTwitter;
    this.singerInstagram = obj.singerInstagram;
    this.albumName = obj.albumName;
    this.albumImage = obj.albumImage;
  }
}

module.exports.SuggestedSongClass = SuggestedSongClass;