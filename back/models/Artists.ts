import mongoose from "mongoose";
import UsersOrm from "./Users";
import { Types } from "mongoose";


const ArtistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: UsersOrm,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await UsersOrm.findById(value);
        if (user) return true;
        return false;
      },
      message: "user does not exist!",
    },
  },
  image: String,
  description: String,
});

const ArtistsOrm = mongoose.model("Artists", ArtistsSchema);
export default ArtistsOrm;