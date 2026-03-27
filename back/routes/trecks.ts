import express from "express";
import TrecksOrm from "../models/Trecks";
import { TreckMutation } from "../types";

const trecksRouter = express.Router();

trecksRouter.post("/", async (req, res) => {
  const data: TreckMutation = {
    title: req.body.title,
    album: req.body.album,
    number_in_album: req.body.number_in_album,
    duration: req.body.duration,
  };

  try {
    const treck = new TrecksOrm(data);
    await treck.save();
    res.send(treck);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

trecksRouter.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const trecks = await TrecksOrm.find({ album: id }).sort({number_in_album: 1});
      return res.send(trecks);
    }
    const trecks = await TrecksOrm.find();
    return res.send(trecks);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default trecksRouter;
