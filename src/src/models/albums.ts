import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import { artists } from "./init-models";

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

export class albums
  extends Model<albumsAttributes, albumsCreationAttributes>
  implements albumsAttributes
{
  id!: string;
  name?: string;
  spotify_id?: string;
  artist_id?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof albums {
    albums.init(
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
        artist_id: {
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
        tableName: "albums",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "albums_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return albums;
  }
}
