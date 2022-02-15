import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";
import type { top_artist_data, top_artist_dataId } from "./top_artist_data";
import type { users, usersId } from "./users";

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

  // top_artists hasMany top_artist_data via top_artist_id
  top_artist_data!: top_artist_data[];
  getTop_artist_data!: Sequelize.HasManyGetAssociationsMixin<top_artist_data>;
  setTop_artist_data!: Sequelize.HasManySetAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  addTop_artist_datum!: Sequelize.HasManyAddAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  addTop_artist_data!: Sequelize.HasManyAddAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  createTop_artist_datum!: Sequelize.HasManyCreateAssociationMixin<top_artist_data>;
  removeTop_artist_datum!: Sequelize.HasManyRemoveAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  removeTop_artist_data!: Sequelize.HasManyRemoveAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  hasTop_artist_datum!: Sequelize.HasManyHasAssociationMixin<
    top_artist_data,
    top_artist_dataId
  >;
  hasTop_artist_data!: Sequelize.HasManyHasAssociationsMixin<
    top_artist_data,
    top_artist_dataId
  >;
  countTop_artist_data!: Sequelize.HasManyCountAssociationsMixin;
  // top_artists belongsTo users via user_id
  user!: users;
  getUser!: Sequelize.BelongsToGetAssociationMixin<users>;
  setUser!: Sequelize.BelongsToSetAssociationMixin<users, usersId>;
  createUser!: Sequelize.BelongsToCreateAssociationMixin<users>;

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
