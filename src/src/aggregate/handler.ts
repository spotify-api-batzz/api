import dayjs, { Dayjs } from "dayjs";
import { KyDatabase } from "../types";
import { sql } from "kysely";
import ramda, { groupBy } from "ramda";

class AggregateHandler {
  private db: KyDatabase;
  constructor(db: KyDatabase) {
    this.db = db;
  }

  getAverageSongsPerDay = async (
    userId: string,
    before?: Date,
    after?: Date
  ) => {
    console.log(userId);
    let query = this.db
      .selectFrom("recent_listens as rl")
      .leftJoin("songs", "songs.id", "rl.song_id")
      .leftJoin("albums", "albums.id", "songs.album_id")
      .leftJoin("thumbnails", "albums.id", "thumbnails.entity_id")
      .leftJoin("users", "users.id", "rl.user_id")
      .select(({ fn }) => [
        sql<string>`TO_CHAR(rl.played_at, 'YYYY-MM-DD')`.as("day"),
        "thumbnails.url",
        "rl.id",
        "song_id",
        "songs.name",
        // fn.count<number>("id").as("count"),
      ])
      .where("rl.user_id", "=", userId)
      .where("thumbnails.width", "=", 300);
    // .groupBy("song_id")
    // .limit(300);

    console.log(query.compile());
    // .groupBy(["day"])
    // .andWhere(sql`DATE(timestamp) = CURRENT_DATE`)

    if (before) {
      query = query.where("rl.played_at", "<", before);
    }

    if (after) {
      query = query.where("rl.played_at", ">", after);
    }

    const songs = await query.execute();
    // .execute();

    const data = ramda.groupBy((song) => song.day, songs);
    // console.log(data);
    // return data;
    return Object.keys(data).map((day) => {
      const d = ramda.groupBy((dayData) => dayData.song_id, data[day]);
      const songIds = Object.keys(d);
      return {
        day,
        count: data[day].length,
        data: songIds.map((id) => {
          const songData = d[id][0];
          return {
            thumbnail: songData.url,
            name: songData.name,
            count: d[id].length,
          };
        }),
      };
    });
  };

  getTimeOfDayListening = async (
    userId: string,
    before?: Date,
    after?: Date
  ) => {
    let query = this.db
      .selectFrom("recent_listens as rl")
      .leftJoin("songs", "songs.id", "rl.song_id")
      .leftJoin("albums", "albums.id", "songs.album_id")
      .leftJoin("thumbnails", "albums.id", "thumbnails.entity_id")
      .leftJoin("users", "users.id", "rl.user_id")
      .select([
        sql<number>`TO_CHAR(rl.played_at, 'HH')::int`.as("hour"),
        sql<string>`TO_CHAR(rl.played_at, 'YYYY-MM-DD')`.as("day"),
        "thumbnails.url",
        "rl.id",
        "song_id",
        "songs.name",
      ])
      .where("rl.user_id", "=", userId)
      .where("thumbnails.width", "=", 300);

    if (before) {
      query = query.where("rl.played_at", "<", before);
    }

    if (after) {
      query = query.where("rl.played_at", ">", after);
    }

    const songs = await query.execute();
    // .execute();

    const data = ramda.groupBy((song) => song.day, songs);
    return Object.keys(data).reduce(
      (prev, curr) => ({
        ...prev,
        [curr]: groupBy((d) => String(Math.round(d.hour / 3)), data[curr]),
      }),
      {}
    );
  };

  getTimeOfDay = async (userId: string, before?: Date, after?: Date) => {
    console.log(userId);
    let query = this.db
      .selectFrom("recent_listens as rl")
      .leftJoin("songs", "songs.id", "rl.song_id")
      .leftJoin("albums", "albums.id", "songs.album_id")
      .leftJoin("thumbnails", "albums.id", "thumbnails.entity_id")
      .leftJoin("users", "users.id", "rl.user_id")
      .select([
        sql<number>`TO_CHAR(rl.played_at, 'HH24')::int`.as("hour"),
        "thumbnails.url",
        "rl.id",
        "song_id",
        "songs.name",
      ])
      .where("rl.user_id", "=", userId)
      .where("thumbnails.width", "=", 300);

    if (before) {
      query = query.where("rl.played_at", "<", before);
    }

    if (after) {
      query = query.where("rl.played_at", ">", after);
    }

    const songs = await query.execute();

    const d = groupBy((a) => String(a.hour), songs);
    return Object.keys(d).map((t) => ({ hour: t, count: d[t].length }));
  };

  stats = async (userId: string) => {
    // Top song of all time
    // Top song of the year (and count)
    // Top  song of the month (and count)
    // night/morning/afternoon listener
    // total unique songs listened to this year (ranked against others in db?)
    // total unique artists listened to this year (ranked against others in db?)
    // total unique albums listened to this year (ranked against others in db?)

    // most similar to whomst? v2 lol
    // top 3 artists

    const startOfMonth = dayjs().startOf("month").toDate();
    const startOfYear = dayjs().startOf("year").toDate();

    const topSongsOfAllTime = await topSongsQuery(this.db, userId);
    const topSongsOfYear = await topSongsQuery(this.db, userId, startOfYear);
    const topSongsOfMonth = await topSongsQuery(this.db, userId, startOfMonth);

    const topAlbumsOfAllTime = await topAlbumsQuery(this.db, userId);
    const topAlbumssOfYear = await topAlbumsQuery(this.db, userId, startOfYear);
    const topAlbumssOfMonth = await topAlbumsQuery(
      this.db,
      userId,
      startOfMonth
    );

    const timeListenedTo = await timeListenedToQuery(this.db, userId);
    const uniqueSongofYear = await uniqueSongsCount(
      this.db,
      userId,
      startOfYear
    );
    const uniqueSongMonth = await uniqueSongsCount(
      this.db,
      userId,
      startOfMonth
    );

    const uniqueAlbumOfYear = await uniqueAlbums(this.db, userId, startOfYear);
    const uniqueAlbumMonth = await uniqueAlbums(this.db, userId, startOfMonth);

    const uniqueArtistsOfYear = await uniqueArtists(
      this.db,
      userId,
      startOfYear
    );
    const uniqueArtistsMonth = await uniqueArtists(
      this.db,
      userId,
      startOfMonth
    );
    // const uniqueAlbum = await uniqueAlbums(this.db, userId);

    return {
      songs: {
        allTime: topSongsOfAllTime,
        year: topSongsOfYear,
        month: topSongsOfMonth,
      },
      albums: {
        allTime: topAlbumsOfAllTime,
        year: topAlbumssOfYear,
        month: topAlbumssOfMonth,
      },
      timeListenedTo,
      uniqueSongs: { year: uniqueSongofYear, month: uniqueSongMonth },
      uniqueAlbums: { year: uniqueAlbumOfYear, month: uniqueAlbumMonth },
      uniqueArtists: { year: uniqueArtistsOfYear, month: uniqueArtistsMonth },
    };
  };
}

//repo
const uniqueArtists = async (
  db: KyDatabase,
  userId: string,
  playedAtAfter?: Date
) => {
  let query = db
    .selectFrom("recent_listens as rl")
    .leftJoin("songs", "songs.id", "rl.song_id")
    .leftJoin("artists", "artists.id", "songs.artist_id")
    .select(({ fn }) => [fn.count<number>("rl.id").as("count")])
    .where("rl.user_id", "=", userId);

  if (playedAtAfter) {
    query = query.where("rl.played_at", ">", playedAtAfter);
  }

  const result = await query.groupBy("artists.id").execute();
  return result.length;
};

const uniqueAlbums = async (
  db: KyDatabase,
  userId: string,
  playedAtAfter?: Date
) => {
  let query = db
    .selectFrom("recent_listens as rl")
    .leftJoin("songs", "songs.id", "rl.song_id")
    .leftJoin("albums", "albums.id", "songs.album_id")
    .select(({ fn }) => [fn.count<number>("rl.id").as("count")])
    .where("rl.user_id", "=", userId);

  if (playedAtAfter) {
    query = query.where("rl.played_at", ">", playedAtAfter);
  }

  const result = await query.groupBy("albums.id").execute();
  return result.length;
};

const uniqueSongsCount = async (
  db: KyDatabase,
  userId: string,
  playedAtAfter?: Date
) => {
  let query = db
    .selectFrom("recent_listens as rl")
    .select(({ fn }) => [fn.count<number>("rl.id").as("count")])
    .where("rl.user_id", "=", userId);

  if (playedAtAfter) {
    query = query.where("rl.played_at", ">", playedAtAfter);
  }

  const result = await query.groupBy("rl.song_id").execute();
  return result.length;
};

const timeListenedToQuery = async (db: KyDatabase, userId: string) => {
  const bucketSQL = `
    CASE
      WHEN TO_CHAR(rl.played_at, 'HH24')::int > 6 AND TO_CHAR(rl.played_at, 'HH24')::int <= 12 THEN 'Morning'
      WHEN TO_CHAR(rl.played_at, 'HH24')::int > 12 AND TO_CHAR(rl.played_at, 'HH24')::int <= 15 THEN 'Afternoon'
      WHEN TO_CHAR(rl.played_at, 'HH24')::int > 15 AND TO_CHAR(rl.played_at, 'HH24')::int <= 21 THEN 'Evening'
    ELSE
      'Night'
    END`;

  return db
    .selectFrom("recent_listens as rl")
    .select(({ fn }) => [
      sql.raw<string>(bucketSQL).as("time_of_day"),
      fn.count<number>("rl.id").as("count"),
    ])
    .where("rl.user_id", "=", userId)
    .groupBy("time_of_day")
    .orderBy("count desc")
    .execute();
};

const topSongsQuery = async (
  db: KyDatabase,
  userId: string,
  playedAtAfter?: Date
) => {
  let query = db
    .selectFrom("recent_listens as rl")
    .leftJoin("songs", "songs.id", "rl.song_id")
    .leftJoin("albums", "albums.id", "songs.album_id")
    .leftJoin("thumbnails", "albums.id", "thumbnails.entity_id")
    .where("thumbnails.width", "=", 64)
    .select(({ fn }) => [
      fn.count<number>("rl.id").as("count"),
      "song_id",
      "songs.name",
      "thumbnails.url as image_url",
    ]);

  if (playedAtAfter) {
    query = query.where("rl.played_at", ">", playedAtAfter);
  }

  return query
    .where("rl.user_id", "=", userId)
    .groupBy(["rl.song_id", "songs.name", "image_url"])
    .orderBy("count desc")
    .limit(3)
    .execute();
};

const topAlbumsQuery = async (
  db: KyDatabase,
  userId: string,
  playedAtAfter?: Date
) => {
  let query = db
    .selectFrom("recent_listens as rl")
    .leftJoin("songs", "songs.id", "rl.song_id")
    .leftJoin("albums", "albums.id", "songs.album_id")
    .leftJoin("thumbnails", "albums.id", "thumbnails.entity_id")
    .where("thumbnails.width", "=", 64)
    .select(({ fn }) => [
      fn.count<number>("rl.id").as("count"),
      "albums.name",
      "album_id",
      "thumbnails.url as image_url",
    ]);

  if (playedAtAfter) {
    query = query.where("rl.played_at", ">", playedAtAfter);
  }

  return query
    .where("rl.user_id", "=", userId)
    .groupBy(["songs.album_id", "albums.id", "albums.name", "image_url"])
    .orderBy("count desc")
    .limit(3)
    .execute();
};

export default AggregateHandler;
