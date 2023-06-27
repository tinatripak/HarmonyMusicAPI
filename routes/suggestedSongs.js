const suggestedSong = require("../models/suggestedSong");
const router = require("express").Router();
const { SuggestedSongClass } = require("../classes/suggestedSongClass");


router.get("/getAll", (req, res) => {
  (async () => {
    try {
      const options = {
        sort: { createdAt: 1 },
      };
      const result = await suggestedSong.find(options);
      if (result) {
        res.status(200).send({ success: true, data: result });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.post("/saveSuggestedSong", (req, res) => {
  (async () => {
    try {
      const sng = new SuggestedSongClass(req.body);
      const newSong = suggestedSong(sng);
      const savedSong = await newSong.save();
      console.log("1", req.body)
      console.log("2", sng)
      console.log("3", newSong)
      console.log("4", savedSong)
      res.status(200).send({ song: savedSong });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteSuggestedSongById/:id", (req, res) => {
  (async () => {
    try {
      const filter = { _id: req.params.id };
      const result = await suggestedSong.deleteOne(filter);

      if (result.deletedCount === 1) {
        res.status(200).send({ success: true, msg: "Data Deleted" });
      } else {
        res.status(200).send({ success: false, msg: "Data Not Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

module.exports = router;
