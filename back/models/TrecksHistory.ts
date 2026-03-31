import mongoose from "mongoose";
import { Types } from "mongoose";


const TrecksHistorySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  treck_id: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true
  },
});

const TrecksHistoryOrm = mongoose.model("trecks_history", TrecksHistorySchema);
export default TrecksHistoryOrm;
