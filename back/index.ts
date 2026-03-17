import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
app.use(express.json());
app.use(cors());
const port = 8001;

// app.use('/products', productsRouter);

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