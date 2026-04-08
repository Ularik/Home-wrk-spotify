import mongoose from "mongoose";
import config from "./config";
import ArtistsOrm from "./models/Artists";
import AlbumsOrm from "./models/Albums";
import TrecksOrm from "./models/Trecks";
import UsersOrm from "./models/Users";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection("artists");
    await db.dropCollection("albums");
    await db.dropCollection("trecks");
    await db.dropCollection("trecks_history");
    await db.dropCollection("users");
  } catch (e) {
    console.log("Collections were not present, skipping drop...");
  }

  const admin = await UsersOrm.create({
    username: 'admin',
    password: 'admin',
    token: '321',
    role: 'admin'
  });
  admin.generateToken();
  await admin.save();

  const user = await UsersOrm.create({
    username: "user",
    password: "user",
    token: "123",
    role: "user",
  });
  user.generateToken();
  await user.save();


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
        title: "Tides",
        album: edSheeranAlbumEquals!._id,
        number_in_album: 1,
        duration: "3:15",
      },
      {
        title: "Overpass Graffiti",
        album: edSheeranAlbumEquals!._id,
        number_in_album: 11,
        duration: "3:56",
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
        title: "Small Bump",
        album: edSheeranAlbumPlus!._id,
        number_in_album: 4,
        duration: "4:19",
      },
      {
        title: "You Need Me, I Don't Need You",
        album: edSheeranAlbumPlus!._id,
        number_in_album: 11,
        duration: "3:40",
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
      {
        title: "Happier",
        album: edSheeranAlbumDivide!._id,
        number_in_album: 6,
        duration: "3:27",
      },
      {
        title: "New Man",
        album: edSheeranAlbumDivide!._id,
        number_in_album: 10,
        duration: "3:09",
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
          title: "Yes",
          album: beyonceDangerous!._id,
          number_in_album: 5,
          duration: "4:10",
        },
        {
          title: "Dangerously in Love 2",
          album: beyonceDangerous!._id,
          number_in_album: 10,
          duration: "4:53",
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
          title: "Hold Up",
          album: beyonceLemonade!._id,
          number_in_album: 2,
          duration: "3:41",
        },
        {
          title: "Freedom (feat. Kendrick Lamar)",
          album: beyonceLemonade!._id,
          number_in_album: 10,
          duration: "4:49",
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
        {
          title: "Bodyguard",
          album: beyonceCowboy!._id,
          number_in_album: 16,
          duration: "4:00",
        },
        {
          title: "Levii's Jeans (with Post Malone)",
          album: beyonceCowboy!._id,
          number_in_album: 18,
          duration: "4:17",
        },
      );

  await db.close();
};

run().catch(console.error);