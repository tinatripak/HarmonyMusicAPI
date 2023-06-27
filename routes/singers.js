const router = require("express").Router();
const singer = require("../models/singer");
const { SingerClass } = require("../classes/singerClass");

router.get("/getSingersInAsc", (req, res) => {
  (async () => {
    try {
      const response = await singer.find({
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

router.get("/getSingerById/:id", (req, res) => {
  (async () => {
    try {
      const response = await singer.findOne({
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

router.post("/saveSinger", (req, res) => {
  (async () => {
    try {
      const sngr = new SingerClass(req.body);
      const newSinger = singer(sngr);

      const savedSinger = await newSinger.save();
      res.status(200).send({ singer: savedSinger });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.put("/updateSingerById/:id", (req, res) => {
  (async () => {
    try {
      const result = await singer.findOneAndUpdate(
        { _id: req.params.id },
        new SingerClass(req.body.data),
        {
          upsert: true,
          new: true,
        }
      );
      res.status(200).send({ singer: result });
    } catch (error) {
      res.status(400).send({ success: false, msg: error });
    }
  })();
});

router.delete("/deleteSingerById/:id", (req, res) => {
  (async () => {
    try {
      const deleteRes = await singer.deleteOne({
        _id: req.params.id,
      });

      if (deleteRes.deletedCount === 1) {
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
