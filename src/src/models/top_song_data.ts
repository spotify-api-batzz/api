import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { songs, songsId } from "./songs";
import type { top_songs, top_songsId } from "./top_songs";

export interface top_song_dataAttributes {
  id: string;
  song_id?: string;
  top_song_id?: string;
  order?: number;
  time_period?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type top_song_dataPk = "id";
export type top_song_dataId = top_song_data[top_song_dataPk];
export type top_song_dataCreationAttributes = Optional<
  top_song_dataAttributes,
  top_song_dataPk
>;

export class top_song_data
  extends Model<top_song_dataAttributes, top_song_dataCreationAttributes>
  implements top_song_dataAttributes
{
  id!: string;
  song_id?: string;
  top_song_id?: string;
  order?: number;
  time_period?: string;
  created_at?: Date;
  updated_at?: Date;

  // top_song_data belongsTo songs via song_id
  song!: songs;
  getSong!: Sequelize.BelongsToGetAssociationMixin<songs>;
  setSong!: Sequelize.BelongsToSetAssociationMixin<songs, songsId>;
  createSong!: Sequelize.BelongsToCreateAssociationMixin<songs>;
  // top_song_data belongsTo top_songs via top_song_id
  top_song!: top_songs;
  getTop_song!: Sequelize.BelongsToGetAssociationMixin<top_songs>;
  setTop_song!: Sequelize.BelongsToSetAssociationMixin<top_songs, top_songsId>;
  createTop_song!: Sequelize.BelongsToCreateAssociationMixin<top_songs>;

  static initModel(sequelize: Sequelize.Sequelize): typeof top_song_data {
    top_song_data.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        song_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "songs",
            key: "id",
          },
        },
        top_song_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "top_songs",
            key: "id",
          },
        },
        order: {
          type: DataTypes.INTEGER,
          allowNull: true,
        },
        time_period: {
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
        tableName: "top_song_data",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "top_song_data_order_idx",
            fields: [{ name: "order" }],
          },
          {
            name: "top_song_data_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "top_song_data_song_id_idx",
            fields: [{ name: "song_id" }],
          },
          {
            name: "top_song_data_time_period_idx",
            fields: [{ name: "time_period" }],
          },
          {
            name: "top_song_data_top_song_id_idx",
            fields: [{ name: "top_song_id" }],
          },
        ],
      }
    );
    return top_song_data;
  }
}
