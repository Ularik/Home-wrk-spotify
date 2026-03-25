import express from "express";
import TrecksHistoryOrm from "../models/TrecksHistory";
import TrecksOrm from "../models/Trecks";
import UsersOrm from "../models/Users";

const trecks_history_Router = express.Router();

trecks_history_Router.post("/", async (req, res) => {
  const token = req.get("Authorization");
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const track_id = req.body.track;
  try {
    const track = await TrecksOrm.findById(track_id);
    if (!track) {
      return res.status(401).send({ error: "Wrong track!" });
    }
    const user = await UsersOrm.findOne({ token });
    if (!user) {
      return res.status(401).send({ error: "Wrong token!" });
    }

    const trecks_history = new TrecksHistoryOrm({
      user_id: user._id,
      track_id: track._id,
      datetime: new Date().toString(),
    });
    await trecks_history.save();
    res.send(trecks_history);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default trecks_history_Router;
