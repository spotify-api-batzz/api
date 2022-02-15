import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { albums, albumsId } from "./albums";
import type { songs, songsId } from "./songs";
import type { top_artist_data, top_artist_dataId } from "./top_artist_data";

export interface artistsAttributes {
  id: string;
  name?: string;
  spotify_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type artistsPk = "id";
export type artistsId = artists[artistsPk];
export type artistsCreationAttributes = Optional<artistsAttributes, artistsPk>;

export class artists
  extends Model<artistsAttributes, artistsCreationAttributes>
  implements artistsAttributes
{
  id!: string;
  name?: string;
  spotify_id?: string;
  created_at?: Date;
  updated_at?: Date;

  // artists hasMany albums via artist_id
  albums!: albums[];
  getAlbums!: Sequelize.HasManyGetAssociationsMixin<albums>;
  setAlbums!: Sequelize.HasManySetAssociationsMixin<albums, albumsId>;
  addAlbum!: Sequelize.HasManyAddAssociationMixin<albums, albumsId>;
  addAlbums!: Sequelize.HasManyAddAssociationsMixin<albums, albumsId>;
  createAlbum!: Sequelize.HasManyCreateAssociationMixin<albums>;
  removeAlbum!: Sequelize.HasManyRemoveAssociationMixin<albums, albumsId>;
  removeAlbums!: Sequelize.HasManyRemoveAssociationsMixin<albums, albumsId>;
  hasAlbum!: Sequelize.HasManyHasAssociationMixin<albums, albumsId>;
  hasAlbums!: Sequelize.HasManyHasAssociationsMixin<albums, albumsId>;
  countAlbums!: Sequelize.HasManyCountAssociationsMixin;
  // artists hasMany songs via artist_id
  songs!: songs[];
  getSongs!: Sequelize.HasManyGetAssociationsMixin<songs>;
  setSongs!: Sequelize.HasManySetAssociationsMixin<songs, songsId>;
  addSong!: Sequelize.HasManyAddAssociationMixin<songs, songsId>;
  addSongs!: Sequelize.HasManyAddAssociationsMixin<songs, songsId>;
  createSong!: Sequelize.HasManyCreateAssociationMixin<songs>;
  removeSong!: Sequelize.HasManyRemoveAssociationMixin<songs, songsId>;
  removeSongs!: Sequelize.HasManyRemoveAssociationsMixin<songs, songsId>;
  hasSong!: Sequelize.HasManyHasAssociationMixin<songs, songsId>;
  hasSongs!: Sequelize.HasManyHasAssociationsMixin<songs, songsId>;
  countSongs!: Sequelize.HasManyCountAssociationsMixin;
  // artists hasMany top_artist_data via artist_id
  top_artist_data!: top_artist_data[];
  getTop_artist_data!: Sequelize.HasManyGetAssociationsMixin<top_artist_data>;
  setTop_artist_data!: Sequelize.HasManySetAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  addTop_artist_datum!: Sequelize.HasManyAddAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  addTop_artist_data!: Sequelize.HasManyAddAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  createTop_artist_datum!: Sequelize.HasManyCreateAssociationMixin<top_artist_data>;
  removeTop_artist_datum!: Sequelize.HasManyRemoveAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  removeTop_artist_data!: Sequelize.HasManyRemoveAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  hasTop_artist_datum!: Sequelize.HasManyHasAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  hasTop_artist_data!: Sequelize.HasManyHasAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  countTop_artist_data!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof artists {
    artists.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        name: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        spotify_id: {
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
        underscored: true,
        tableName: "artists",
        schema: "public",
        timestamps: false,
        indexes: [
          {
            name: "artists_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return artists;
  }
}
