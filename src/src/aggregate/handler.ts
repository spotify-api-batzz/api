import dayjs, { Dayjs } from "dayjs";
import { Client } from "pg";

const formatToPgTimestamp = (dayjs: Dayjs) =>
  dayjs.format("YYYY-MM-DD hh:mm:ss");

class AggregateHandler {
  private db: Client;
  constructor(db: Client) {
    this.db = db;
  }

  public async getRecentListensByUserIdBetweenDate(
    start: number,
    end: number,
    userId: string
  ) {
    const startDate = dayjs(start);
    const endDate = dayjs(end);

    const data = await this.db.query<{ count: number; name: string }[]>(
      `
      SELECT count(*)::int,songs.name from recent_listens
        INNER JOIN songs on recent_listens.song_id = songs.id
        WHERE user_id=$1
        AND played_at<=$2
        AND played_at>=$3
        GROUP BY songs.name
        ORDER BY count(*) DESC
      `,
      [userId, formatToPgTimestamp(startDate), formatToPgTimestamp(endDate)]
    );
    return data.rows;
  }
}

export default AggregateHandler;
