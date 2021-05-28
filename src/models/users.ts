import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

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
