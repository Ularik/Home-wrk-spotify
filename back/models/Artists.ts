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


ArtistsSchema.pre("findOneAndDelete", async function () {
    const docToDelete = await this.model.findOne(this.getQuery());
    if (docToDelete) {
      if (docToDelete) {
        const AlbumsOrm = mongoose.model("Albums");
        const albums = await AlbumsOrm.find({ artist: docToDelete._id });
        
        for (const album of albums) {
          await AlbumsOrm.findOneAndDelete({ _id: album._id });
        }
  }}
});

const ArtistsOrm = mongoose.model("Artists", ArtistsSchema);
export default ArtistsOrm;