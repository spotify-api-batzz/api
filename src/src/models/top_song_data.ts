import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
        },
        top_song_id: {
          type: DataTypes.TEXT,
          allowNull: true,
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
            name: "top_song_data_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return top_song_data;
  }
}
