import express from "express";
import { AlbumMutation } from "../types";
import { imagesUpload } from "../multer";
import AlbumsOrm from "../models/Albums";

const albumsRouter = express.Router();

albumsRouter.post("/", imagesUpload.single("image"), async (req, res) => {
  const data: AlbumMutation = {
    title: req.body.title,
    image: req.file ? "images/" + req.file.filename : null,
    artist: req.body.artist,
    year_manufacture: req.body.year_manufacture,
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
  const { id } = req.query;
  try {
    if (id) {
      const filteredAlbums = await AlbumsOrm.find({artist: id});
      res.send(filteredAlbums);
    }
    const albums = await AlbumsOrm.find();
    res.send(albums);
  } catch (err) {
    res.sendStatus(500);
  }
});


albumsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const filteredAlbums = await AlbumsOrm.find({ _id: id }).populate(
      "artist",
      "name",
    );
    res.send(filteredAlbums);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default albumsRouter;
