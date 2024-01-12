const router = require("express").Router();
const admin = require("../config/firebase.config.js");
const user = require("../models/user");
const { UserClass } = require("../classes/userClass");

router.get("/login", (req, res) => {
  (async () => {
    console.log(req.headers)
    if (!req.headers.authorization) {
      return res.status(500).send({ message: "Invalid Token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (!decodeValue) {
        return res.status(505).json({ message: "Unauthorize" });
      }
      const userExists = await user.findOne({ user_id: decodeValue.user_id });
      if (!userExists) {
        await newUserData(decodeValue, req, res);
      } else {
        await updateUserData(decodeValue, req, res);
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  })();
});

router.post("/loginEmail", (req, res) => {
  (async () => {
    if (!req.headers.authorization) {
      return res.status(500).send({ message: "Invalid Token" });
    }
    const token = req.headers.authorization.split(" ")[1];
    try {
      const decodeValue = await admin.auth().verifyIdToken(token);
      if (!decodeValue) {
        return res.status(505).json({ message: "Unauthorized" });
      }
      const userExists = await user.findOne({ email: req.body.email });
      if (!userExists) {
        res.status(400).json({ success: false, msg: "You must be registered" });
      } else {
        const currentUser = await user.findOne({
          email: req.body.email,
          password: req.body.password,
        });
        await user.findOneAndUpdate(
          { email: req.body.email },
          { user_id: decodeValue.user_id },
          { new: true }
        );
        res.status(200).send({ user: currentUser });
      }
    } catch (error) {
      return res.status(500).json({ message: error });
    }
  })();
});

router.post("/register", (req, res) => {
  (async () => {
    const userExists = await user.findOne({ email: req.body.email });
    if (!userExists) {
      try {
        const usr = new UserClass(req.body);
        const newUser = user(usr);
        const savedUser = await newUser.save();
        res.status(200).send({ user: savedUser });
      } catch (error) {
        res.status(400).send({ success: false, msg: error });
      }
    } else {
      res.status(400).send({ success: false, msg: "The email exists" });
    }
  })();
});

router.put("/addSongToFavourites/:_id", (req, res) => {
  (async () => {
    const filter = { _id: req.params._id };
    const songId = req.body.songId.songId;
    const options = {
      upsert: true,
      new: true,
    };
    try {
      await user.findOneAndUpdate(
        filter,
        { $push: { favourites: `${songId}` } },
        options
      );
      res.status(200).send({ success: true, msg: "Song added to favourites" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.put("/deleteSongFromFavourites/:_id", (req, res) => {
  (async () => {
    const filter = { _id: req.params._id };
    const songId = req.body.songId.songId;

    const options = {
      upsert: true,
      new: true,
    };
    try {
      await user.findOneAndUpdate(
        filter,
        { $pull: { favourites: `${songId}` } },
        options
      );

      res.status(200).send({ success: true, msg: "Song removed from favourites" });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.get("/getUsers", (req, res) => {
  (async () => {
    const options = {
      sort: { createdAt: 1 },
    };

    const result = await user.find(options);
    if (result) {
      res.status(200).send({ success: true, data: result });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  })();
});

router.get("/getFavourites/:_id", (req, res) => {
  (async () => {
    const id = req.params._id;

    try {
      const foundUser = await user.findById(id);
      if (foundUser) {
        res.status(200).json({ success: true, data: foundUser.favourites });
      } else {
        res.status(404).json({ success: false, msg: "User not found" });
      }
    } catch (error) {
      res.status(400).json({ success: false, msg: error });
    }
  })();
});

router.put("/updateNameAndEmailUserById/:userId", (req, res) => {
  (async () => {
    const filter = { _id: req.params.userId };
    const { name, email } = req.body.data;
    console.log(req.body.data, name, email);
    const options = {
      upsert: true,
      new: true,
    };

    try {
      const result = await user.findOneAndUpdate(
        filter,
        { name: name, email: email },
        options
      );
      res.status(200).send({ user: result });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  })();
});

router.put("/updatePhotoUserById/:userId", (req, res) => {
  (async () => {
    const filter = { _id: req.params.userId };
    const imageURL = req.body.data.imageURL;

    const options = {
      upsert: true,
      new: true,
    };
    try {
      const result = await user.findOneAndUpdate(
        filter,
        { imageURL: imageURL },
        options
      );
      res.status(200).send({ user: result });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  })();
});

router.put("/updateRoleById/:userId", (req, res) => {
  (async () => {
    const filter = { _id: req.params.userId };
    const role = req.body.data.role;

    const options = {
      upsert: true,
      new: true,
    };

    try {
      const result = await user.findOneAndUpdate(filter, { role: role }, options);
      res.status(200).send({ user: result });
    } catch (err) {
      res.status(400).send({ success: false, msg: err });
    }
  })();
});

router.delete("/deleteUserById/:userId", (req, res) => {
  (async () => {
    const filter = { _id: req.params.userId };

    const result = await user.deleteOne(filter);
    if (result.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  })();
});

const newUserData = async (decodeValue, req, res) => {
  const usr = new UserClass(decodeValue);
  const newUser = user(usr);
  try {
    const savedUser = await newUser.save();
    res.status(200).send({ user: savedUser });
  } catch (error) {
    res.status(400).send({ success: false, msg: error });
  }
};

const updateUserData = async (decodeValue, req, res) => {
  const filter = { user_id: decodeValue.user_id };
  const options = {
    upsert: true,
    new: true,
  };

  try {
    const result = await user.findOneAndUpdate(
      filter,
      { auth_time: decodeValue.auth_time },
      options
    );
    res.status(200).send({ user: result });
  } catch (err) {
    res.status(400).send({ success: false, msg: err });
  }
};

module.exports = router;