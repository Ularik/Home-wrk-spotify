import mongoose from "mongoose";
import { Types } from "mongoose";
import AlbumsOrm from "./Albums";
import UsersOrm from "./Users";

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
  number_in_album: {
    type: Number,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

TrecksSchema.pre('findOneAndDelete', async function () {
  const docToDelete = await this.model.findOne(this.getQuery());
  if (docToDelete) {
    await mongoose
      .model("trecks_history")
      .deleteMany({ treck_id: docToDelete._id });
  }
});

const TrecksOrm = mongoose.model("Trecks", TrecksSchema);
export default TrecksOrm;
