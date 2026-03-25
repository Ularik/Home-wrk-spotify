import mongoose from "mongoose";

const ArtistsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  image: String,
  description: String,
});

const ArtistsOrm = mongoose.model("Artists", ArtistsSchema);
export default ArtistsOrm;