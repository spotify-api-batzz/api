import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { top_song_data, top_song_dataId } from "./top_song_data";
import type { users, usersId } from "./users";

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

  // top_songs hasMany top_song_data via top_song_id
  top_song_data!: top_song_data[];
  getTop_song_data!: Sequelize.HasManyGetAssociationsMixin<top_song_data>;
  setTop_song_data!: Sequelize.HasManySetAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  addTop_song_datum!: Sequelize.HasManyAddAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  addTop_song_data!: Sequelize.HasManyAddAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  createTop_song_datum!: Sequelize.HasManyCreateAssociationMixin<top_song_data>;
  removeTop_song_datum!: Sequelize.HasManyRemoveAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  removeTop_song_data!: Sequelize.HasManyRemoveAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  hasTop_song_datum!: Sequelize.HasManyHasAssociationMixin<
    top_song_data,
    top_song_dataId
  >;
  hasTop_song_data!: Sequelize.HasManyHasAssociationsMixin<
    top_song_data,
    top_song_dataId
  >;
  countTop_song_data!: Sequelize.HasManyCountAssociationsMixin;
  // top_songs belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

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
          references: {
            model: "users",
            key: "id",
          },
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
            name: "top_songs_created_at_idx",
            fields: [{ name: "created_at" }],
          },
          {
            name: "top_songs_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
          {
            name: "top_songs_user_id_idx",
            fields: [{ name: "user_id" }],
          },
        ],
      }
    );
    return top_songs;
  }
}
