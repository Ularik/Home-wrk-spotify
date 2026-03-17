import mongoose from "mongoose";
import { Types } from "mongoose";
import AlbumsOrm from "./artists";

const TracksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  album: {
    type: mongoose.Types.ObjectId,
    ref: AlbumsOrm,
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const album = await AlbumsOrm.findById(value);
        if (album) return true;
        return false;
    },
      message: "Category does not exist!",
    },
  },
  duration: {
    type: String,
    required: true,
  },
});

const TracksOrm = mongoose.model("Tracks", TracksSchema);
export default TracksOrm;
