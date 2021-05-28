import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface recent_listensAttributes {
  id: string;
  user_id?: string;
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
  user_id?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof recent_listens {
    recent_listens.init(
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
        tableName: "recent_listens",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "recent_listens_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return recent_listens;
  }
}
