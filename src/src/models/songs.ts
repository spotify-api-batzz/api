import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { albums, albumsId } from "./albums";
import type { artists, artistsId } from "./artists";
import type { recent_listens, recent_listensId } from "./recent_listens";
import type { top_song_data, top_song_dataId } from "./top_song_data";

export interface songsAttributes {
  id: string;
  spotify_id?: string;
  album_id?: string;
  artist_id?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type songsPk = "id";
export type songsId = songs[songsPk];
export type songsCreationAttributes = Optional<songsAttributes, songsPk>;

export class songs
  extends Model<songsAttributes, songsCreationAttributes>
  implements songsAttributes
{
  id!: string;
  spotify_id?: string;
  album_id?: string;
  artist_id?: string;
  name?: string;
  created_at?: Date;
  updated_at?: Date;

  // songs belongsTo albums via album_id
  album!: albums;
  getAlbum!: Sequelize.BelongsToGetAssociationMixin<albums>;
  setAlbum!: Sequelize.BelongsToSetAssociationMixin<albums, albumsId>;
  createAlbum!: Sequelize.BelongsToCreateAssociationMixin<albums>;
  // songs belongsTo artists via artist_id
  artist!: artists;
  getArtist!: Sequelize.BelongsToGetAssociationMixin<artists>;
  setArtist!: Sequelize.BelongsToSetAssociationMixin<artists, artistsId>;
  createArtist!: Sequelize.BelongsToCreateAssociationMixin<artists>;
  // songs hasMany recent_listens via song_id
  recent_listens!: recent_listens[];
  getRecent_listens!: Sequelize.HasManyGetAssociationsMixin<recent_listens>;
  setRecent_listens!: Sequelize.HasManySetAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  addRecent_listen!: Sequelize.HasManyAddAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  addRecent_listens!: Sequelize.HasManyAddAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  createRecent_listen!: Sequelize.HasManyCreateAssociationMixin<recent_listens>;
  removeRecent_listen!: Sequelize.HasManyRemoveAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  removeRecent_listens!: Sequelize.HasManyRemoveAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  hasRecent_listen!: Sequelize.HasManyHasAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  hasRecent_listens!: Sequelize.HasManyHasAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  countRecent_listens!: Sequelize.HasManyCountAssociationsMixin;
  // songs hasMany top_song_data via song_id
  top_song_data!: top_song_data[];
  getTop_song_data!: Sequelize.HasManyGetAssociationsMixin<top_song_data>;
  setTop_song_data!: Sequelize.HasManySetAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  addTop_song_datum!: Sequelize.HasManyAddAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  addTop_song_data!: Sequelize.HasManyAddAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  createTop_song_datum!: Sequelize.HasManyCreateAssociationMixin<top_song_data>;
  removeTop_song_datum!: Sequelize.HasManyRemoveAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  removeTop_song_data!: Sequelize.HasManyRemoveAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  hasTop_song_datum!: Sequelize.HasManyHasAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  hasTop_song_data!: Sequelize.HasManyHasAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  countTop_song_data!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof songs {
    songs.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        spotify_id: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        album_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "albums",
            key: "id",
          },
        },
        artist_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "artists",
            key: "id",
          },
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        created_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
        updated_at: {
          type: DataTypes.DATE,
          allowNull: true,
        },
      },
      {
        sequelize,
        tableName: "songs",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "songs_album_id_idx",
            fields: [{ name: "album_id" }],
          },
          {
            name: "songs_artist_id_idx",
            fields: [{ name: "artist_id" }],
          },
          {
            name: "songs_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return songs;
  }
}
