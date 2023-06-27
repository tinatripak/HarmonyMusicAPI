const mongoose = require("mongoose");
const {SingerClass} = require("../classes/singerClass");

const singerSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
    },
    twitter: {
      type: String,
    },
    instagram: {
      type: String,
    },
  },
  { timestamps: true }
);

singerSchema.loadClass(SingerClass);
module.exports = mongoose.model("artist", singerSchema);