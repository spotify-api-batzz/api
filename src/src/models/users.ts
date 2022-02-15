import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { recent_listens, recent_listensId } from "./recent_listens";
import type { top_artists, top_artistsId } from "./top_artists";
import type { top_songs, top_songsId } from "./top_songs";

export interface usersAttributes {
  id: string;
  spotify_id?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type usersPk = "id";
export type usersId = users[usersPk];
export type usersCreationAttributes = Optional<usersAttributes, usersPk>;

export class users
  extends Model<usersAttributes, usersCreationAttributes>
  implements usersAttributes
{
  id!: string;
  spotify_id?: string;
  username?: string;
  password?: string;
  created_at?: Date;
  updated_at?: Date;

  // users hasMany recent_listens via user_id
  recent_listens!: recent_listens[];
  getRecent_listens!: Sequelize.HasManyGetAssociationsMixin<recent_listens>;
  setRecent_listens!: Sequelize.HasManySetAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  addRecent_listen!: Sequelize.HasManyAddAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  addRecent_listens!: Sequelize.HasManyAddAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  createRecent_listen!: Sequelize.HasManyCreateAssociationMixin<recent_listens>;
  removeRecent_listen!: Sequelize.HasManyRemoveAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  removeRecent_listens!: Sequelize.HasManyRemoveAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  hasRecent_listen!: Sequelize.HasManyHasAssociationMixin<
    recent_listens,
    recent_listensId
  >;
  hasRecent_listens!: Sequelize.HasManyHasAssociationsMixin<
    recent_listens,
    recent_listensId
  >;
  countRecent_listens!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany top_artists via user_id
  top_artists!: top_artists[];
  getTop_artists!: Sequelize.HasManyGetAssociationsMixin<top_artists>;
  setTop_artists!: Sequelize.HasManySetAssociationsMixin<
    top_artists,
    top_artistsId
  >;
  addTop_artist!: Sequelize.HasManyAddAssociationMixin<
    top_artists,
    top_artistsId
  >;
  addTop_artists!: Sequelize.HasManyAddAssociationsMixin<
    top_artists,
    top_artistsId
  >;
  createTop_artist!: Sequelize.HasManyCreateAssociationMixin<top_artists>;
  removeTop_artist!: Sequelize.HasManyRemoveAssociationMixin<
    top_artists,
    top_artistsId
  >;
  removeTop_artists!: Sequelize.HasManyRemoveAssociationsMixin<
    top_artists,
    top_artistsId
  >;
  hasTop_artist!: Sequelize.HasManyHasAssociationMixin<
    top_artists,
    top_artistsId
  >;
  hasTop_artists!: Sequelize.HasManyHasAssociationsMixin<
    top_artists,
    top_artistsId
  >;
  countTop_artists!: Sequelize.HasManyCountAssociationsMixin;
  // users hasMany top_songs via user_id
  top_songs!: top_songs[];
  getTop_songs!: Sequelize.HasManyGetAssociationsMixin<top_songs>;
  setTop_songs!: Sequelize.HasManySetAssociationsMixin<top_songs, top_songsId>;
  addTop_song!: Sequelize.HasManyAddAssociationMixin<top_songs, top_songsId>;
  addTop_songs!: Sequelize.HasManyAddAssociationsMixin<top_songs, top_songsId>;
  createTop_song!: Sequelize.HasManyCreateAssociationMixin<top_songs>;
  removeTop_song!: Sequelize.HasManyRemoveAssociationMixin<
    top_songs,
    top_songsId
  >;
  removeTop_songs!: Sequelize.HasManyRemoveAssociationsMixin<
    top_songs,
    top_songsId
  >;
  hasTop_song!: Sequelize.HasManyHasAssociationMixin<top_songs, top_songsId>;
  hasTop_songs!: Sequelize.HasManyHasAssociationsMixin<top_songs, top_songsId>;
  countTop_songs!: Sequelize.HasManyCountAssociationsMixin;

  static initModel(sequelize: Sequelize.Sequelize): typeof users {
    users.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        spotify_id: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        username: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        password: {
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
        tableName: "users",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "users_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return users;
  }
}
