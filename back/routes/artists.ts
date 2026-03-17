import express from "express";
import ArtistsOrm from "../models/Artists";
import { Artist, ArtistMutatiion } from "../types";
import { imagesUpload } from "../multer";


const artistsRouter = express.Router();

artistsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
    const data: ArtistMutatiion = {
      name: req.body.name,
      image: req.file ? req.file.filename : null,
      descrition: req.body.description,
    };

    try {
        const artist = new ArtistsOrm(data);
        await artist.save();
        res.send(artist);
    } catch(err) {
        res.sendStatus(500);
    }
});


artistsRouter.get("/", async (req, res) => {

  try {
    const artist: Artist[] = await ArtistsOrm.find();
    res.send(artist);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default artistsRouter;