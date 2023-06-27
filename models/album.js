const mongoose = require("mongoose");
const {AlbumClass} = require("../classes/albumClass");

const albumSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    artist: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

albumSchema.loadClass(AlbumClass);
module.exports = mongoose.model("album", albumSchema);