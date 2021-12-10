import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
        },
        artist_id: {
          type: DataTypes.TEXT,
          allowNull: true,
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
