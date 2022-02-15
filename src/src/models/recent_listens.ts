import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { songs, songsId } from "./songs";
import type { users, usersId } from "./users";

export interface recent_listensAttributes {
  id: string;
  song_id?: string;
  user_id?: string;
  played_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export type recent_listensPk = "id";
export type recent_listensId = recent_listens[recent_listensPk];
export type recent_listensCreationAttributes = Optional<
  recent_listensAttributes,
  recent_listensPk
>;

export class recent_listens
  extends Model<recent_listensAttributes, recent_listensCreationAttributes>
  implements recent_listensAttributes
{
  id!: string;
  song_id?: string;
  user_id?: string;
  played_at?: Date;
  created_at?: Date;
  updated_at?: Date;

  // recent_listens belongsTo songs via song_id
  song!: songs;
  getSong!: Sequelize.BelongsToGetAssociationMixin<songs>;
  setSong!: Sequelize.BelongsToSetAssociationMixin<songs, songsId>;
  createSong!: Sequelize.BelongsToCreateAssociationMixin<songs>;
  // recent_listens belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

  static initModel(sequelize: Sequelize.Sequelize): typeof recent_listens {
    recent_listens.init(
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
        user_id: {
          type: DataTypes.TEXT,
          allowNull: true,
          references: {
            model: "users",
            key: "id",
          },
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
        tableName: "recent_listens",
        schema: "public",
        timestamps: false,
        underscored: true,
        indexes: [
          {
            name: "test_recent_listens_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return recent_listens;
  }
}
