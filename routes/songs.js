const router = require("express").Router();
const { default: mongoose } = require("mongoose");
const song = require("../models/song");
const { SongClass } = require("../classes/songClass");


router.get("/getSongsInAsc", (_, res) => {
  (async () => {
    const response = await song.find({
      sort: { createdAt: 1 },
    });
  
    if (response) {
      res.status(200).send({ success: true, data: response });
    } else {
      res.status(200).send({ success: true, msg: "No Data Found" });
    }
  })();
});

router.get("/getSongsInDesc", (_, res) => {
  (async () => {
    try {
      const response = await song.find({
        sort: { createdAt: -1 },
      });

      if (response) {
        res.status(200).send({ success: true, data: response });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.get("/getSongsByAlbum/:album", (req, res) => {
  (async () => {
    try {
      const response = await song.find({
        album: req.params.album,
      });

      if (response) {
        res.status(200).send({ success: true, data: response });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.get("/getSongsBySinger/:singer", (req, res) => {
  (async () => {
    try {
      const response = await song.find({
        artist: req.params.singer,
      });

      if (response) {
        res.status(200).send({ success: true, data: response });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteSongsByAlbum/:albumName", (req, res) => {
  (async () => {
    try {
      const deletedRes = await song.deleteMany({ album: req.params.albumName });
      if (deletedRes.deletedCount > 0) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
      } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteSongsBySinger/:singerName", (req, res) => {
  (async () => {
    try {
      const deletedRes = await song.deleteMany({ artist: req.params.singerName });
      if (deletedRes.deletedCount > 0) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
      } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.get("/getSongById/:id", (req, res) => {
  (async () => {
    try {
      const response = await song.findOne({
        _id: req.params.id,
      });

      if (response) {
        res.status(200).send({ success: true, data: response });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.get("/getSongsByIds", (req, res) => {
  (async () => {
    if (!req.query.songIds) {
      res.status(400).json({ success: false, msg: "Missing songIds" });
      return;
    }

    let songIds;
    try {
      songIds = JSON.parse(req.query.songIds);
    } catch (error) {
      res.status(400).json({ success: false, msg: "Invalid songIds" });
      return;
    }

    const songIdObjects = songIds.map((id) => mongoose.Types.ObjectId(id));

    try {
      const songs = await song.find({ _id: { $in: songIdObjects } });
      res.status(200).json({ success: true, data: songs });
    } catch (error) {
      res.status(500).json({ success: false, msg: error });
    }
  })();
});

router.post("/saveSong", (req, res) => {
  (async () => {
    try {
      const sng = new SongClass(req.body);
      const newSong = song(sng);
      const savedSong = await newSong.save();
      res.status(200).send({ song: savedSong });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.put("/updateSongById/:id", (req, res) => {
  (async () => {
    try {
      const result = await song.findOneAndUpdate(
        { _id: req.params.id },
        new SongClass(req.body.data),
        {
          upsert: true,
          new: true,
        }
      );
      res.status(200).send({ song: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});


router.delete("/deleteSongById/:id", (req, res) => {
  (async () => {
    console.log(req.params.id);
    const deletedRes = await song.deleteOne({ _id: req.params.id });
    if (deletedRes.deletedCount === 1) {
      res.status(200).send({ success: true, msg: "Data Deleted" });
    } else {
      res.status(200).send({ success: false, msg: "Data Not Found" });
    }
  })();
});

module.exports = router;
