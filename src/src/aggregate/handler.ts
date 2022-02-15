import dayjs, { Dayjs } from "dayjs";
import { Op, fn, cast } from "sequelize";
import { Database } from "models/init-models";

const formatToPgTimestamp = (dayjs: Dayjs) =>
  dayjs.format("YYYY-MM-DD hh:mm:ss");

class AggregateHandler {
  private db: Database;
  constructor(db: Database) {
    this.db = db;
  }

  public async getRecentListensByUserIdBetweenDate(
    start: number,
    end: number,
    userId: string
  ) {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    const recentListenAggregations = await this.db.recentListens.findAll({
      attributes: [
        [cast(fn("count", "song_id"), "int"), "song_id_count"],
        "song_id",
      ],
      where: {
        created_at: { [Op.gte]: formatToPgTimestamp(startDate) },
        updated_at: { [Op.lte]: formatToPgTimestamp(endDate) },
        user_id: userId,
      },
      group: ["song_id"],
      order: [[fn("count", "song_id"), "DESC"]],
    });

    const songs = await this.db.songs.findAll({
      where: {
        id: recentListenAggregations.map((rl) => {
          return rl.song_id;
        }),
      },
    });

    const getMeta = (id) =>
      songs.find((song) => song.get("id") === id).get() || {};

    return recentListenAggregations.map((rla) => ({
      count: rla.get("song_id_count"),
      ...getMeta(rla.get("song_id")),
    }));
  }
}

export default AggregateHandler;
