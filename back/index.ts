import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistsRouter from "./routes/artists";
import albumsRouter from "./routes/albums";
import tracksRouter from "./routes/tracks";
import usersRouter from "./routes/users";
import tracks_history_Router from "./routes/track_history";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8001;

app.use("/users", usersRouter);
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/track_history", tracks_history_Router);

const run = async () => {
  await mongoose.connect("mongodb://localhost/link_data");

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((err) => console.error(err));