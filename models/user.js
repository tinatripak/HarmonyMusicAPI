const mongoose = require("mongoose");
const {UserClass} = require("../classes/userClass");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    imageURL: {
      type: String,
      required: true,
      default: "https://firebasestorage.googleapis.com/v0/b/musicapp-5ed7e.appspot.com/o/Images%2F1685218526989-128-1280406_view-user-icon-png-user-circle-icon-png.png?alt=media&token=d1a0f8a9-0031-43db-a4f9-f730960be00b"
    },
    user_id: {
      type: String,
    },
    email_verfied: {
      type: Boolean,
    },
    role: {
      type: String,
      required: true,
      default: "member",
    },
    auth_time: {
      type: String,
    },
    favourites: {
      type: Array,
    },
  },
  { timestamps: true }
);

userSchema.loadClass(UserClass);
module.exports = mongoose.model("user", userSchema);