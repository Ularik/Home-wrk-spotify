import express from "express";
import TrecksOrm from "../models/Trecks";
import { TreckMutation } from "../types";

const trecksRouter = express.Router();

trecksRouter.post("/", async (req, res) => {
  // console.log(req.body);
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
  const { albumId } = req.query;
  try {
    if (albumId) {
      res.send(await TrecksOrm.find({ album: albumId }));
    }
    const trecks = await TrecksOrm.find();
    res.send(trecks);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default trecksRouter;
