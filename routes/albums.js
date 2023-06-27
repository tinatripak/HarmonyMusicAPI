const router = require("express").Router();
const album = require("../models/album");
const { AlbumClass } = require("../classes/albumClass");

router.get("/getAlbumsInAsc", (req, res) => {
  (async () => {
    try {
      const response = await album.find({
        sort: { createdAt: 1 },
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

router.get("/getAlbumById/:id", (req, res) => {
  (async () => {
    try {
      const response = await album.findOne({
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

router.get("/getAlbumsBySinger/:singerName", (req, res) => {
  (async () => {
    try {
      const response = await album.find({
        artist: req.params.singerName,
      });

      if (response.length > 0) {
        res.status(200).send({ success: true, data: response });
      } else {
        res.status(200).send({ success: true, msg: "No Data Found" });
      }
    } catch (error) {
      res.status(500).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteAlbumsBySinger/:singerName", (req, res) => {
  (async () => {
    try {
      const deletedRes = await album.deleteMany({
        artist: req.params.singerName,
      });
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

router.post("/saveAlbum", (req, res) => {
  (async () => {
    try {
      const alb = new AlbumClass(req.body);
      const newAlbum = album(alb);

      const savedAlbum = await newAlbum.save();
      res.status(200).send({ album: savedAlbum });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.put("/updateAlbumById/:id", (req, res) => {
  (async () => {
    try {
      const result = await album.findOneAndUpdate(
        { _id: req.params.id },
        new AlbumClass(req.body.data),
        {
          upsert: true,
          new: true,
        }
      );
      res.status(200).send({ album: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteAlbumById/:id", (req, res) => {
  (async () => {
    try {
      const deletedRes = await album.deleteOne({
        _id: req.params.id,
      });

      if (deletedRes.deletedCount === 1) {
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
