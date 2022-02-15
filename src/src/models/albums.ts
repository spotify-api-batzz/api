import * as Sequelize from 'sequelize';
import { DataTypes, Model, Optional } from 'sequelize';
import type { artists, artistsId } from './artists';
import type { songs, songsId } from './songs';

export interface albumsAttributes {
  id: string;
  name?: string;
  spotify_id?: string;
  artist_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type albumsPk = "id";
export type albumsId = albums[albumsPk];
export type albumsCreationAttributes = Optional<albumsAttributes, albumsPk>;

export class albums extends Model<albumsAttributes, albumsCreationAttributes> implements albumsAttributes {
  id!: string;
  name?: string;
  spotify_id?: string;
  artist_id?: string;
  created_at?: Date;
  updated_at?: Date;

  // albums hasMany songs via album_id
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
  // albums belongsTo artists via artist_id
  artist!: artists;
  getArtist!: Sequelize.BelongsToGetAssociationMixin<artists>;
  setArtist!: Sequelize.BelongsToSetAssociationMixin<artists, artistsId>;
  createArtist!: Sequelize.BelongsToCreateAssociationMixin<artists>;

  static initModel(sequelize: Sequelize.Sequelize): typeof albums {
    albums.init({
    id: {
      type: DataTypes.TEXT,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    spotify_id: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    artist_id: {
      type: DataTypes.TEXT,
      allowNull: true,
      references: {
        model: 'artists',
        key: 'id'
      }
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'albums',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albums_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
  return albums;
  }
}
