import { Client, Pool, PoolClient } from "pg";
import { Database } from "./models/init-models";

export enum Endpoints {
  songs = "songs",
  albums = "albums",
  artists = "artists",
  thumbnails = "thumbnails",
  users = "users",
  recentListens = "recentListens",
  topSongs = "topSongs",
  topArtists = "topArtists",
}

interface CacheInformation {
  maxAge: string;
}

export type EndpointCacheInformation = {
  [T in Endpoints]: CacheInformation;
};

export interface AppContext {
  sequelize: Database;
  pool: Pool;
}
