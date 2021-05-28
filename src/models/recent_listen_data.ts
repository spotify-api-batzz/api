import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface recent_listen_dataAttributes {
  id: string;
  song_id?: string;
  recent_listen_id?: string;
  played_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export type recent_listen_dataPk = "id";
export type recent_listen_dataId = recent_listen_data[recent_listen_dataPk];
export type recent_listen_dataCreationAttributes = Optional<
  recent_listen_dataAttributes,
  recent_listen_dataPk
>;

export class recent_listen_data
  extends Model<
    recent_listen_dataAttributes,
    recent_listen_dataCreationAttributes
  >
  implements recent_listen_dataAttributes
{
  id!: string;
  song_id?: string;
  recent_listen_id?: string;
  played_at?: Date;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof recent_listen_data {
    recent_listen_data.init(
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
        recent_listen_id: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        played_at: {
          type: DataTypes.DATE,
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
        tableName: "recent_listen_data",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "recent_listen_data_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return recent_listen_data;
  }
}
