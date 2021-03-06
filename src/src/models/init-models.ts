import type { Sequelize, Model } from "sequelize";
import { albums } from "./albums";
import type { albumsAttributes, albumsCreationAttributes } from "./albums";
import { artists } from "./artists";
import type { artistsAttributes, artistsCreationAttributes } from "./artists";
import { recent_listens } from "./recent_listens";
import type {
  recent_listensAttributes,
  recent_listensCreationAttributes,
} from "./recent_listens";
import { songs } from "./songs";
import type { songsAttributes, songsCreationAttributes } from "./songs";
import { thumbnails } from "./thumbnails";
import type {
  thumbnailsAttributes,
  thumbnailsCreationAttributes,
} from "./thumbnails";
import { top_artist_data } from "./top_artist_data";
import type {
  top_artist_dataAttributes,
  top_artist_dataCreationAttributes,
} from "./top_artist_data";
import { top_artists } from "./top_artists";
import type {
  top_artistsAttributes,
  top_artistsCreationAttributes,
} from "./top_artists";
import { top_song_data } from "./top_song_data";
import type {
  top_song_dataAttributes,
  top_song_dataCreationAttributes,
} from "./top_song_data";
import { top_songs } from "./top_songs";
import type {
  top_songsAttributes,
  top_songsCreationAttributes,
} from "./top_songs";
import { users } from "./users";
import type { usersAttributes, usersCreationAttributes } from "./users";

export {
  albums,
  artists,
  recent_listens,
  songs,
  thumbnails,
  top_artist_data,
  top_artists,
  top_song_data,
  top_songs,
  users,
};

export type {
  albumsAttributes,
  albumsCreationAttributes,
  artistsAttributes,
  artistsCreationAttributes,
  recent_listensAttributes,
  recent_listensCreationAttributes,
  songsAttributes,
  songsCreationAttributes,
  thumbnailsAttributes,
  thumbnailsCreationAttributes,
  top_artist_dataAttributes,
  top_artist_dataCreationAttributes,
  top_artistsAttributes,
  top_artistsCreationAttributes,
  top_song_dataAttributes,
  top_song_dataCreationAttributes,
  top_songsAttributes,
  top_songsCreationAttributes,
  usersAttributes,
  usersCreationAttributes,
};

export interface Database {
  albums: typeof albums;
  artists: typeof artists;
  recentListens: typeof recent_listens;
  songs: typeof songs;
  users: typeof users;
  thumbnails: typeof thumbnails;
  topArtistData: typeof top_artist_data;
  topArtists: typeof top_artists;
  topSongData: typeof top_song_data;
  topSongs: typeof top_songs;
  db: Sequelize;
}

export function initModels(sequelize: Sequelize): Database {
  albums.initModel(sequelize);
  artists.initModel(sequelize);
  recent_listens.initModel(sequelize);
  songs.initModel(sequelize);
  thumbnails.initModel(sequelize);
  top_artist_data.initModel(sequelize);
  top_artists.initModel(sequelize);
  top_song_data.initModel(sequelize);
  top_songs.initModel(sequelize);
  users.initModel(sequelize);

  // albums
  albums.hasMany(thumbnails, {
    foreignKey: "entity_id",
    constraints: false,
    scope: {
      entity: "album",
    },
  });
  albums.belongsTo(artists);

  //artists
  artists.hasMany(thumbnails, {
    foreignKey: "entity_id",
    constraints: false,
    scope: {
      entity: "artist",
    },
  });
  artists.hasOne(albums);

  // thumbnails
  thumbnails.belongsTo(artists, {
    foreignKey: "entity_id",
    constraints: false,
  });
  thumbnails.belongsTo(albums, { foreignKey: "entity_id", constraints: false });

  //songs
  songs.belongsTo(artists);
  songs.belongsTo(albums);

  // recent_listens
  recent_listens.belongsTo(users);
  recent_listens.belongsTo(songs);

  // users
  users.hasMany(recent_listens, { foreignKey: "user_id" });

  return {
    albums: albums,
    artists: artists,
    recentListens: recent_listens,
    songs: songs,
    thumbnails: thumbnails,
    topArtistData: top_artist_data,
    topArtists: top_artists,
    topSongData: top_song_data,
    topSongs: top_songs,
    users: users,
    db: sequelize,
  };
}
