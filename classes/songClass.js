class SongClass {
  constructor(obj) {
    this.name = obj.name;
    this.imageURL = obj.imageURL;
    this.songUrl = obj.songUrl;
    this.album = obj.album;
    this.artist = obj.artist;
    this.language = obj.language;
    this.category = obj.category;
    this.year = obj.year;
  }
}

module.exports.SongClass = SongClass;