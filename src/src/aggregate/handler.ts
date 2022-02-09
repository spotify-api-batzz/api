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
    console.log(formatToPgTimestamp(startDate));
    console.log(start);

    const data = await this.db.query(
      `
      select count(*),songs.name from recent_listens
        inner join songs on recent_listens.song_id = songs.id
        where user_id='$1'
        and played_at <= '$2'
        and played_at >= '$3'
        group by songs.name
      `,
      [userId, formatToPgTimestamp(startDate), formatToPgTimestamp(endDate)]
    );
    return data.rows;
  }
}

export default AggregateHandler;
