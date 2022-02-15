import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { artists, artistsId } from "./artists";
import type { top_artists, top_artistsId } from "./top_artists";

export interface top_artist_dataAttributes {
  id: string;
  artist_id?: string;
  top_artist_id?: string;
  time_period?: string;
  order?: number;
  created_at?: Date;
  updated_at?: Date;
}

export type top_artist_dataPk = "id";
export type top_artist_dataId = top_artist_data[top_artist_dataPk];
export type top_artist_dataCreationAttributes = Optional<
  top_artist_dataAttributes,
  top_artist_dataPk
>;

export class top_artist_data
  extends Model<top_artist_dataAttributes, top_artist_dataCreationAttributes>
  implements top_artist_dataAttributes
{
  id!: string;
  artist_id?: string;
  top_artist_id?: string;
  time_period?: string;
  order?: number;
  created_at?: Date;
  updated_at?: Date;

  // top_artist_data belongsTo artists via artist_id
  artist!: artists;
  getArtist!: Sequelize.BelongsToGetAssociationMixin<artists>;
  setArtist!: Sequelize.BelongsToSetAssociationMixin<artists, artistsId>;
  createArtist!: Sequelize.BelongsToCreateAssociationMixin<artists>;
  // top_artist_data belongsTo top_artists via top_artist_id
  top_artist!: top_artists;
  getTop_artist!: Sequelize.BelongsToGetAssociationMixin<top_artists>;
  setTop_artist!: Sequelize.BelongsToSetAssociationMixin<
    top_artists,
    top_artistsId
  >;
  createTop_artist!: Sequelize.BelongsToCreateAssociationMixin<top_artists>;

  static initModel(sequelize: Sequelize.Sequelize): typeof top_artist_data {
    top_artist_data.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        artist_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "artists",
            key: "id",
          },
        },
        top_artist_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "top_artists",
            key: "id",
          },
        },
        time_period: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        order: {
          type: DataTypes.INTEGER,
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
        tableName: "top_artist_data",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "top_artist_data_artist_id_idx",
            fields: [{ name: "artist_id" }],
          },
          {
            name: "top_artist_data_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "top_artist_data_top_artist_id_idx",
            fields: [{ name: "top_artist_id" }],
          },
        ],
      }
    );
    return top_artist_data;
  }
}
