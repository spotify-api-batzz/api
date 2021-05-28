import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
        },
        top_artist_id: {
          type: DataTypes.TEXT,
          allowNull: true,
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
        timestamps: false,
        underscored: true,
        indexes: [
          {
            name: "top_artist_data_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return top_artist_data;
  }
}
