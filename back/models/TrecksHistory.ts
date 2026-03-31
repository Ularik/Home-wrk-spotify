import mongoose from "mongoose";
import { Types } from "mongoose";
import TrecksOrm from "./Trecks";
import UsersOrm from "./Users";


const TrecksHistorySchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    ref: UsersOrm,
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await UsersOrm.findById(value);
        if (user) return true;
        return false;
      },
      message: "User not exist"
    }
  },
  treck_id: {
    type: mongoose.Types.ObjectId,
    ref: TrecksOrm,
    required: true,
    validate: {
    validator: async (value: Types.ObjectId) => {
      const treck = await TrecksOrm.findById(value);
      if (treck) return true;
      return false;
    },
    message: "Treck does not exist!",
  },
  },

  datetime: {
    type: Date,
    required: true,
  },
});

const TrecksHistoryOrm = mongoose.model("trecks_history", TrecksHistorySchema);
export default TrecksHistoryOrm;
