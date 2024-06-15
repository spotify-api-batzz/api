import getAllSongsQuery from "./queries/allSongs";
import getRecentListensQuery from "./queries/recentListens";
import getUsersQuery from "./queries/users";
import getTopArtists from "./queries/topArtists";
import getTopSongs from "./queries/topSongs";

export default {
  getUsers: getUsersQuery,
  getRecentListens: getRecentListensQuery,
  getAllSongs: getAllSongsQuery,
  getTopArtists: getTopArtists,
  getTopSongs: getTopSongs,
};
