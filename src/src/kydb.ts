import type { ColumnType } from "kysely";

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Albums {
  artist_id: string | null;
  created_at: Timestamp | null;
  id: string;
  name: string | null;
  spotify_id: string | null;
  updated_at: Timestamp | null;
}

export interface Artists {
  created_at: Timestamp | null;
  id: string;
  name: string | null;
  spotify_id: string | null;
  updated_at: Timestamp | null;
}

export interface RecentListens {
  created_at: Timestamp | null;
  id: string;
  played_at: Timestamp | null;
  song_id: string | null;
  updated_at: Timestamp | null;
  user_id: string | null;
}

export interface Songs {
  album_id: string | null;
  artist_id: string | null;
  created_at: Timestamp | null;
  id: string;
  name: string | null;
  spotify_id: string | null;
  updated_at: Timestamp | null;
}

export interface Thumbnails {
  created_at: Timestamp | null;
  entity_id: string | null;
  /**
   * 12
   */
  entity_type: string | null;
  height: number | null;
  id: string;
  updated_at: Timestamp | null;
  url: string | null;
  width: number | null;
}

export interface TopArtistData {
  artist_id: string | null;
  created_at: Timestamp | null;
  id: string;
  order: number | null;
  time_period: string | null;
  top_artist_id: string | null;
  updated_at: Timestamp | null;
}

export interface TopArtists {
  created_at: Timestamp | null;
  id: string;
  updated_at: Timestamp | null;
  user_id: string | null;
}

export interface TopSongData {
  created_at: Timestamp | null;
  id: string;
  order: number | null;
  song_id: string | null;
  time_period: string | null;
  top_song_id: string | null;
  updated_at: Timestamp | null;
}

export interface TopSongs {
  created_at: Timestamp | null;
  id: string;
  updated_at: Timestamp | null;
  user_id: string | null;
}

export interface Users {
  created_at: Timestamp | null;
  id: string;
  password: string | null;
  spotify_id: string | null;
  updated_at: Timestamp | null;
  username: string | null;
}

export interface DB {
  albums: Albums;
  artists: Artists;
  recent_listens: RecentListens;
  songs: Songs;
  thumbnails: Thumbnails;
  top_artist_data: TopArtistData;
  top_artists: TopArtists;
  top_song_data: TopSongData;
  top_songs: TopSongs;
  users: Users;
}
