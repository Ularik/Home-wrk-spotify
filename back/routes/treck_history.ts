import express from "express";
import TrecksHistoryOrm from "../models/TrecksHistory";
import TrecksOrm from "../models/Trecks";
import UsersOrm from "../models/Users";

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
    const trecks_history = await TrecksHistoryOrm.find({ user_id: String(user._id)});
    return res.send({trecks_history: trecks_history});
  } catch(err) {
    return res.sendStatus(400).send({error: err});
  }
}
);

trecks_history_Router.post("/", async (req, res) => {
  const token = req.get("Authorization");
  if (!token) {
    res.status(401).send({ error: "Unauthorized" });
    return;
  }
  const treck_id = req.body.treckId;
  try {
    const treck = await TrecksOrm.findById(treck_id);
    if (!treck) {
      return res.status(400).send({ error: "Wrong treck!" });
    }

    const user = await UsersOrm.findOne({ token: token });
    if (!user) {
      return res.status(400).send({ error: "Wrong token!" });
    }

    const trecks_history = new TrecksHistoryOrm({
      user_id: user._id,
      treck_id: treck._id,
      datetime: new Date().toString(),
    });
    await trecks_history.save();
    return res.send(trecks_history);
  } catch (err) {
    console.log(err)
    return res.sendStatus(400);
  }
});

export default trecks_history_Router;
