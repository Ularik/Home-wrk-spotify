import express from "express";
import TrecksOrm from "../models/Trecks";
import { TreckMutation } from "../types";
import auth from "../middlewares/auth";
import { RequestWithUser } from "../middlewares/auth";
import permit from "../middlewares/peermit";


const trecksRouter = express.Router();

trecksRouter.post("/", auth, async (req, res) => {
  const data: TreckMutation = {
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
    console.error(err);
    res.status(400).send({error: "Error in create treck"});
  }
});

trecksRouter.get("/", async (req, res) => {
  const { id } = req.query;
  try {
    if (id) {
      const trecks = await TrecksOrm.find({ album: id }).sort({number_in_album: 1});
      return res.send(trecks);
    }
    const trecks = await TrecksOrm.find();
    return res.send(trecks);
  } catch (err) {
    res.sendStatus(500);
  }
});


trecksRouter.patch("/:id", auth, permit('admin'), async (req, res) => {
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
    if (!treck) return res.status(400).send({error: 'Treck doesnt exist'});
    await treck?.deleteOne();

    return res.send({success: 'seccess delete'});
  } catch (err) {
    res.sendStatus(500);
  }
});

export default trecksRouter;
