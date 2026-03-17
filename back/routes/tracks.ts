import express from "express";
import TracksOrm from "../models/Tracks";
import { TrackMutation } from "../types";

const tracksRouter = express.Router();


tracksRouter.post("/", async (req, res) => {
  const data: TrackMutation = {
    title: req.body.title,
    album: req.body.album,
    duration: req.body.duration,
  };

  try {
    const track = new TracksOrm(data);
    await track.save();
    res.send(track);
  } catch (err) {
    res.sendStatus(500);
  }
});


tracksRouter.get("/", async (req, res) => {
    const { albumId } = req.query;
  try {
    if (albumId) {
        res.send(await TracksOrm.find({album: albumId}));
    }
    const tracks = await TracksOrm.find();
    res.send(tracks);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default tracksRouter;