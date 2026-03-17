import express from "express";
import ArtistsOrm from "../models/Artists";
import { Artist, ArtistMutatiion } from "../types";

const artistsRouter = express.Router();

artistsRouter.post("/", async (req, res) => {
    const data = {
        name: req.body.name,
        image: req.body.image,
        descrition: req.body.description
    };

    try {
        const artist = new ArtistsOrm(data);
        await artist.save();
    } catch(err) {
        res.sendStatus(500);
    }
});


artistsRouter.get("/", async (req, res) => {

  try {
    const artist = await ArtistsOrm.find();
    res.send(artist);
  } catch (err) {
    res.sendStatus(500);
  }
});