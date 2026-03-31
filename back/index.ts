import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import artistsRouter from "./routes/artists";
import albumsRouter from "./routes/albums";
import trecksRouter from "./routes/trecks";
import usersRouter from "./routes/users";
import trecks_history_Router from "./routes/treck_history";
import config from "./config";

const app = express();
app.use(express.json());
app.use(express.static(config.publicPath));
app.use(cors());
const port = 8001;

app.use("/users", usersRouter);
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/trecks", trecksRouter);
app.use("/trecks_history", trecks_history_Router);

const run = async () => {
  await mongoose.connect(config.db);

  app.listen(port, () => {
    console.log(`Server started on ${port} port!`);
  });

  process.on("exit", () => {
    mongoose.disconnect();
  });
};

run().catch((err) => console.error(err));