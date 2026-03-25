import mongoose from "mongoose";
import config from "./config";
import ArtistsOrm from "./models/Artists";
import AlbumsOrm from "./models/Albums";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("Artists");
    await db.dropCollection("Albums");
    // await db.dropCollection("Tracks");
    // await db.dropCollection("TracksHistory");
    // await db.dropCollection("Users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const [edSheeranArtist, beyonceArtist] = await ArtistsOrm.create(
    {
      name: "Edd Sheeran",
      image: "fixtures/4f9a9f58-5a16-4a48-b0ba-860b195ac53f.webp",
      description: "Edd Sheeran",
    },

    {
      name: "Beyonce",
      image: "fixtures/fbcf36de-9e05-4be0-b9c0-493e4a33a575.webp",
      description: "Beyonce",
    },
  );

  const [edSheeranAlbum, beyonceAlbum] = await AlbumsOrm.create(
    {
      title: "Autumn Variations",
      image: "fixtures/950c0ae6-5c67-4d6b-b961-9145a4f17d03.webp",
      artist: edSheeranArtist!._id,
      year_manufacture: 2023,
    },
    {
      title: "Halo",
      image: "fixtures/abea22c4-63a8-4392-a73c-19bcca19db18.webp",
      artist: beyonceArtist!._id,
      year_manufacture: 2009,
    },
  );

  await db.close();
};

run().catch(console.error);