import { Kysely } from "kysely";
import { DB } from "./kydb";

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

export type KyDatabase = Kysely<DB>;
