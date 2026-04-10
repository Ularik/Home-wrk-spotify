import mongoose from "mongoose";
import { Types } from "mongoose";
import ArtistsOrm from "./Artists";
import UsersOrm from "./Users";


const AlbumsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
  },
  artist: {
    type: mongoose.Types.ObjectId,
    ref: ArtistsOrm,
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await ArtistsOrm.findById(value);
        if (artist) return true;
        return false;
      },
    },
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
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
  year_manufacture: {
    type: Number,
    required: true,
  },
});

AlbumsSchema.pre("findOneAndDelete", async function () {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (docToDelete) {
      if (docToDelete) {
        const TrecksOrm = mongoose.model("Trecks");
        const trecks = await TrecksOrm.find({ album: docToDelete._id });
        
        for (const treck of trecks) {
          await TrecksOrm.findOneAndDelete({ _id: treck._id });
        }
  }}
});

const AlbumsOrm = mongoose.model("Albums", AlbumsSchema);
export default AlbumsOrm;