import mongoose from "mongoose";
import { Types } from "mongoose";
import ArtistsOrm from "./Artists";

const AlbumsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    artist: {
        type: mongoose.Types.ObjectId,
        ref: ArtistsOrm,
        required: true,
        validate: {
            validator: async (value: Types.ObjectId) => {
                console.log(value);
                const artist = await ArtistsOrm.findById(value);
                console.log(artist)
                if (artist) return true;
                return false;
            },
        }
    },
    image: String,
    year_manufacture: {
        type: Number,
        required: true
    }
});

const AlbumsOrm = mongoose.model("Albums", AlbumsSchema);
export default AlbumsOrm;