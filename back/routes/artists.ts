import express from "express";
import ArtistsOrm from "../models/Artists";
import { Artist, ArtistMutatiion } from "../types";
import { imagesUpload } from "../multer";


const artistsRouter = express.Router();

artistsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
    const data: ArtistMutatiion = {
      name: req.body.name,
      image: req.file ? "images/" + req.file.filename : null,
      description: req.body.description,
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
    const artist = await ArtistsOrm.find();
    res.send(artist);
  } catch (err) {
    console.log(err);
    res.sendStatus(500);
  }
});

artistsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const artist = await ArtistsOrm.findById(id);
      return res.send(artist);
    }
    return res.sendStatus(400).send({error: 'Artist not found'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});

export default artistsRouter;