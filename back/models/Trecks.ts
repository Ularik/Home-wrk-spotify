import mongoose from "mongoose";
import { Types } from "mongoose";
import AlbumsOrm from "./Albums";


const TrecksSchema = new mongoose.Schema({
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
  number_in_album: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
    unique: true
  },
});

const TrecksOrm = mongoose.model("Trecks", TrecksSchema);
export default TrecksOrm;
