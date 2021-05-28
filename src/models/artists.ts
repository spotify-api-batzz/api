import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
        tableName: "artists",
        schema: "public",
        underscored: true,
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
