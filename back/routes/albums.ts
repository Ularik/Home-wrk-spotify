import express from "express";
import ArtistsOrm from "../models/Artists";
import { Album, AlbumMutation } from "../types";
import { imagesUpload } from "../multer";
import AlbumsOrm from "../models/Albums";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  const data: AlbumMutation = {
    title: req.body.title,
    image: req.file ? req.file.filename : null,
    artist: req.body.artist,
  };

  try {
    const album = new AlbumsOrm(data);
    await album.save();
    res.send(album);
  } catch (err) {
    res.sendStatus(500);
  }
});

albumsRouter.get("/", async (req, res) => {
  try {
    const albums: Album[] = await AlbumsOrm.find();
    res.send(albums);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default albumsRouter;
