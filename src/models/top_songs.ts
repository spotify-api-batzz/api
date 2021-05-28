import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface top_songsAttributes {
  id: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type top_songsPk = "id";
export type top_songsId = top_songs[top_songsPk];
export type top_songsCreationAttributes = Optional<
  top_songsAttributes,
  top_songsPk
>;

export class top_songs
  extends Model<top_songsAttributes, top_songsCreationAttributes>
  implements top_songsAttributes
{
  id!: string;
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof top_songs {
    top_songs.init(
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
        tableName: "top_songs",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "top_songs_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return top_songs;
  }
}
