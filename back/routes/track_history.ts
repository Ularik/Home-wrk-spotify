import express from "express";
import TracksHistoryOrm from "../models/TracksHistory";
import TracksOrm from "../models/Tracks";
import UsersOrm from "../models/Users";

const tracks_history_Router = express.Router();


tracks_history_Router.post("/", async (req, res) => {
    const token = req.get('Authorization');
    if (!token) {
        res.status(401).send({'error': 'Unauthorized'});
        return;
    }
    const track_id = req.body.track;
  try {
    const track = await TracksOrm.findById(track_id);
    if (!track) {
        return res.status(401).send({ error: "Wrong track!" });
    }
    const user = await UsersOrm.findOne({token});
    if (!user) {
        return res.status(401).send({ error: "Wrong token!" });
    }

    const tracks_history = new TracksHistoryOrm({
        user_id: user._id,
        track_id: track._id,
        datetime: new Date().toString()
    });
    await tracks_history.save();
    res.send(tracks_history);
  } catch (err) {
    res.sendStatus(500);
  }
});

export default tracks_history_Router;
