import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface top_artistsAttributes {
  id: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type top_artistsPk = "id";
export type top_artistsId = top_artists[top_artistsPk];
export type top_artistsCreationAttributes = Optional<
  top_artistsAttributes,
  top_artistsPk
>;

export class top_artists
  extends Model<top_artistsAttributes, top_artistsCreationAttributes>
  implements top_artistsAttributes
{
  id!: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof top_artists {
    top_artists.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        user_id: {
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
        tableName: "top_artists",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "top_artists_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return top_artists;
  }
}
