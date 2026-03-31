import express from "express";
import TrecksHistoryOrm from "../models/TrecksHistory";
import type { PopulatedTreck } from "../types";
import UsersOrm from "../models/Users";
import { Types } from "mongoose";
import AlbumsOrm from "../models/Albums";

const trecks_history_Router = express.Router();


trecks_history_Router.get("/", async (req, res) => {
  const token = req.get("Authorization");
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return
  }

  const user = await UsersOrm.findOne({ token });
  if (!user) {
    return res.status(401).send({ error: "Wrong token!" });
  }

  try {
    const trecks_history = await TrecksHistoryOrm.find({
      user_id: new Types.ObjectId(user._id),
    }).sort({'datetime': -1}).populate("treck_id", "title duration album");

    const albums_ids = trecks_history.map(history => {
      const treck = history.treck_id as unknown as PopulatedTreck;
      return treck.album;
    } 
  );
    const albums = await AlbumsOrm.find({ _id: { $in: albums_ids } }).populate(
      "artist",
      "name",
    );

    return res.send({trecks_history, albums});
  } catch(err) {
    return res.status(400).send({error: err});
  }
});


trecks_history_Router.post("/", async (req, res) => {
  const token = req.get("Authorization");
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const treck_id = req.body.treckId;
  try {
    const user = await UsersOrm.findOne({ token: token });
    if (!user) {
      return res.status(400).send({ error: "Wrong token!" });
    }

    const trecks_history = new TrecksHistoryOrm({
      user_id: user._id,
      treck_id: treck_id,
      datetime: new Date(),
    });
    await trecks_history.save();
    return res.send(trecks_history);
  } catch (err) {
    console.log(err)
    return res.sendStatus(400);
  }
});

export default trecks_history_Router;
