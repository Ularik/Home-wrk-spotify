import mongoose from "mongoose";
import { Types } from "mongoose";


const TracksHistorySchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
    unique: true,
  },
  track_id: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true
  },
});

const TracksHistoryOrm = mongoose.model("TracksHistory", TracksHistorySchema);
export default TracksHistoryOrm;
