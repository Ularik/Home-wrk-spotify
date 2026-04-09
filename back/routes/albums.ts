import express from "express";
import { AlbumMutation, AlbumWithCountOfTrecks } from "../types";
import { imagesUpload } from "../middlewares/multer";
import AlbumsOrm from "../models/Albums";
import TrecksOrm from "../models/Trecks";
import auth, { RequestWithUser } from "../middlewares/auth";
import permit from "../middlewares/peermit";
import { Error } from "mongoose";


const albumsRouter = express.Router();

albumsRouter.post("/", auth, imagesUpload.single("image"), async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const data: AlbumMutation = {
    user: String(user._id),
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
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
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
    const album = await AlbumsOrm.findById(id).populate("artist", "name");
    if (album) return res.send(album);
    return res.send({});
  } catch (err) {
    return res.status(500).send({error: 'Server error'});
  }
});


albumsRouter.patch("/:id/togglePublished", auth, permit('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const album = await AlbumsOrm.findById(id);
    if (album) {
      album.isPublished = !album.isPublished;
      await album.save();
      return res.send(album);
    }
    return res.send({error: 'album not exists'});
  } catch (err) {
    return res.sendStatus(500);
  }
});


albumsRouter.delete("/:id", auth, permit('admin'), async (req, res) => {
  const { id } = req.params;
  try {
    const album = await AlbumsOrm.findById(id);
    if (!album) return res.status(400).send({error: 'album does not exists'});
    await album?.deleteOne();
    return res.send({success: 'delete'});
  } catch (err) {
    return res.sendStatus(500);
  }
});


export default albumsRouter;
