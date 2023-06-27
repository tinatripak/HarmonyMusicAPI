const mongoose = require("mongoose");
const {SuggestedSongClass} = require("../classes/suggestedSongClass");

const suggestedSongSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    songName: {
      type: String,
      required: true,
    },
    songImage: {
      type: String,
      required: true,
    },
    songAudio: {
      type: String,
      required: true,
    },
    songLanguage: {
      type: String,
      required: true,
    },
    songCategory: {
      type: String,
      required: true,
    },
    songYear: {
      type: String,
      required: true,
    },
    singerName: {
      type: String,
      required: true,
    },
    singerImage: {
      type: String,
      required: true,
    },
    singerTwitter: {
      type: String,
    },
    singerInstagram: {
      type: String,
    },
    albumName: {
      type: String,
      required: true,
    },
    albumImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

suggestedSongSchema.loadClass(SuggestedSongClass);
module.exports = mongoose.model("suggestedSong", suggestedSongSchema);