import dayjs, { Dayjs } from "dayjs";
import { Op, fn } from "sequelize";
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

    const data = await this.db.recentListens.findAll({
      attributes: [[fn("count", "song_id"), "song_id_count"], "song.id"],
      where: {
        created_at: { [Op.gte]: formatToPgTimestamp(startDate) },
        updated_at: { [Op.lte]: formatToPgTimestamp(endDate) },
        user_id: userId,
      },
      include: {
        model: this.db.songs,
      },
      group: ["song_id", "song.song_id"],
    });

    return data;
  }
}

export default AggregateHandler;
