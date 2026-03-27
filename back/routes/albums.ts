import express from "express";
import { AlbumMutation, AlbumWithCountOfTrecks } from "../types";
import { imagesUpload } from "../multer";
import AlbumsOrm from "../models/Albums";
import TrecksOrm from "../models/Trecks";

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
      const filteredAlbums = await AlbumsOrm.find({ artist: id }).sort({year_manufacture: -1});
      const newAlbums: AlbumWithCountOfTrecks[] = [];
      for (const album of filteredAlbums) {
        const albumId = album._id;
        const trecksCount = (await TrecksOrm.find({ album: albumId })).length;
        newAlbums.push({
          ...album.toObject(),
          trecksCount: trecksCount,
        } as AlbumWithCountOfTrecks);
      }
      return res.send(newAlbums);
    }
    else {
      const albums = await AlbumsOrm.find();
      return res.send(albums);
    }
  } catch (err) {
    return res.sendStatus(500);
  }
});


albumsRouter.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const filteredAlbums = await AlbumsOrm.find({ _id: id }).populate(
      "artist",
      "name",
    );
    if (filteredAlbums.length) return res.send(filteredAlbums[0]);
    return res.send({});
  } catch (err) {
    return res.sendStatus(500);
  }
});

export default albumsRouter;
