import express from "express";
import ArtistsOrm from "../models/Artists";
import auth from "../middlewares/auth";
import permit from "../middlewares/peermit";
import { Artist, ArtistMutatiion } from "../types";
import { imagesUpload } from "../middlewares/multer";
import { Error } from "mongoose";


const artistsRouter = express.Router();

artistsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
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
      if (err instanceof Error.ValidationError) {
        return res.status(400).send(err);
      }
      return next(err);
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
    const artist = await ArtistsOrm.findById(id);
    if (artist) {
      return res.send(artist);
    }
    return res.sendStatus(400).send({error: 'Artist not found'});
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});


artistsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await ArtistsOrm.findById(id);
    if (artist) {
      artist.isPublished = !artist.isPublished;
      await artist.save()
      return res.send(artist);
    }
    return res.sendStatus(400).send({ error: "Artist not found" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});


artistsRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const artist = await ArtistsOrm.findById(id);
    if (artist) {
      await artist.deleteOne();
      return res.send({ success: "delete artist" });
    }
    return res.sendStatus(400).send({ error: "Artist not found" });
  } catch (err) {
    console.log(err);
    return res.sendStatus(500);
  }
});



export default artistsRouter;