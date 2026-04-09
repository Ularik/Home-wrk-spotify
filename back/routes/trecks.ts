import express from "express";
import TrecksOrm from "../models/Trecks";
import { TreckMutation } from "../types";
import auth from "../middlewares/auth";
import { RequestWithUser } from "../middlewares/auth";
import permit from "../middlewares/peermit";
import { Error } from "mongoose";

const trecksRouter = express.Router();

trecksRouter.post("/", auth, async (req, res, next) => {
  const user = (req as RequestWithUser).user;
  const data: TreckMutation = {
    user: String(user._id),
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
    if (err instanceof Error.ValidationError) {
      return res.status(400).send(err);
    }
    return next(err);
  }
});

trecksRouter.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const trecks = await TrecksOrm.find({ album: id }).sort({
        number_in_album: 1,
      });
      return res.send(trecks);
    }
    const trecks = await TrecksOrm.find();
    return res.send(trecks);
  } catch (err) {
    res.sendStatus(500);
  }
});

trecksRouter.patch("/:id", auth, permit("admin"), async (req, res) => {
  const { id } = req.params;
  try {
    const treck = await TrecksOrm.findById(id);
    if (!treck) return res.status(400).send({ error: "Treck doesnt exist" });
    treck.isPublished = !treck.isPublished;
    await treck.save();

    return res.send(treck);
  } catch (err) {
    res.sendStatus(500);
  }
});

trecksRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const treck = await TrecksOrm.findById(id);
    if (!treck) return res.status(400).send({ error: "Treck doesnt exist" });
    await treck?.deleteOne();

    return res.send({ success: "seccess delete" });
  } catch (err) {
    res.sendStatus(500);
  }
});

export default trecksRouter;
