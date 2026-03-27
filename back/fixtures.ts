import mongoose from "mongoose";
import config from "./config";
import ArtistsOrm from "./models/Artists";
import AlbumsOrm from "./models/Albums";
import TrecksOrm from "./models/Trecks";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("trecks");
    // await db.dropCollection("trecks_history");
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

  const [edSheeranAlbumEquals, edSheeranAlbumPlus, edSheeranAlbumDivide] =
    await AlbumsOrm.create(
      {
        title: "Equals",
        image: "fixtures/equals.webp",
        artist: edSheeranArtist!._id,
        year_manufacture: 2021,
      },
      {
        title: "Plus",
        image: "fixtures/Plus.webp",
        artist: edSheeranArtist!._id,
        year_manufacture: 2011,
      },
      {
        title: "Divide",
        image: "fixtures/divide.webp",
        artist: edSheeranArtist!._id,
        year_manufacture: 2017,
      },
    );

    await TrecksOrm.create(
      {
        title: "Shivers",
        album: edSheeranAlbumEquals!._id,
        number_in_album: 2,
        duration: "3:27",
      },
      {
        title: "Bad Habits",
        album: edSheeranAlbumEquals!._id,
        number_in_album: 4,
        duration: "3:51",
      },
      {
        title: "Visiting Hours",
        album: edSheeranAlbumEquals!._id,
        number_in_album: 12,
        duration: "3:35",
      },
      {
        title: "The A Team",
        album: edSheeranAlbumPlus!._id,
        number_in_album: 1,
        duration: "4:18",
      },
      {
        title: "Lego House",
        album: edSheeranAlbumPlus!._id,
        number_in_album: 9,
        duration: "3:05",
      },
      {
        title: "Give Me Love",
        album: edSheeranAlbumPlus!._id,
        number_in_album: 12,
        duration: "8:46",
      },
      {
        title: "Shape of You",
        album: edSheeranAlbumDivide!._id,
        number_in_album: 4,
        duration: "3:53",
      },
      {
        title: "Perfect",
        album: edSheeranAlbumDivide!._id,
        number_in_album: 5,
        duration: "4:23",
      },
      {
        title: "Castle on the Hill",
        album: edSheeranAlbumDivide!._id,
        number_in_album: 2,
        duration: "4:21",
      },
    );

    const [beyonceDangerous, beyonceLemonade, beyonceCowboy] =
      await AlbumsOrm.create(
        {
          title: "Dangerously in Love",
          image: "fixtures/danger.webp",
          artist: beyonceArtist!._id,
          year_manufacture: 2003,
        },
        {
          title: "Lemonade",
          image: "fixtures/lemonade.webp",
          artist: beyonceArtist!._id,
          year_manufacture: 2016,
        },
        {
          title: "Cowboy Carter",
          image: "fixtures/cowboy.webp",
          artist: beyonceArtist!._id,
          year_manufacture: 2024,
        },
      );

      await TrecksOrm.create(
        {
          title: "Crazy in Love",
          album: beyonceDangerous!._id,
          number_in_album: 1,
          duration: "3:56",
        },
        {
          title: "Baby Boy",
          album: beyonceDangerous!._id,
          number_in_album: 4,
          duration: "4:04",
        },
        {
          title: "Me, Myself and I",
          album: beyonceDangerous!._id,
          number_in_album: 11,
          duration: "5:01",
        },

        {
          title: "Pray You Catch Me",
          album: beyonceLemonade!._id,
          number_in_album: 1,
          duration: "3:16",
        },
        {
          title: "Daddy Lessons",
          album: beyonceLemonade!._id,
          number_in_album: 6,
          duration: "4:48",
        },
        {
          title: "Formation",
          album: beyonceLemonade!._id,
          number_in_album: 12,
          duration: "3:26",
        },

        {
          title: "Ameriican Requiem",
          album: beyonceCowboy!._id,
          number_in_album: 2,
          duration: "5:25",
        },
        {
          title: "Texas Hold 'Em",
          album: beyonceCowboy!._id,
          number_in_album: 6,
          duration: "3:53",
        },
        {
          title: "II Most Wanted (with Miley Cyrus)",
          album: beyonceCowboy!._id,
          number_in_album: 11,
          duration: "3:28",
        },
      );

  await db.close();
};

run().catch(console.error);