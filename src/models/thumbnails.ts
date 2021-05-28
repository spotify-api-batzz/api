import * as Sequelize from "sequelize";
import { DataTypes, Model, Optional } from "sequelize";

export interface thumbnailsAttributes {
  id: string;
  entity?: string;
  entity_id?: string;
  width?: number;
  height?: number;
  url?: string;
  created_at?: Date;
  updated_at?: Date;
}

export type thumbnailsPk = "id";
export type thumbnailsId = thumbnails[thumbnailsPk];
export type thumbnailsCreationAttributes = Optional<
  thumbnailsAttributes,
  thumbnailsPk
>;

export class thumbnails
  extends Model<thumbnailsAttributes, thumbnailsCreationAttributes>
  implements thumbnailsAttributes
{
  id!: string;
  entity?: string;
  entity_id?: string;
  width?: number;
  height?: number;
  url?: string;
  created_at?: Date;
  updated_at?: Date;

  static initModel(sequelize: Sequelize.Sequelize): typeof thumbnails {
    thumbnails.init(
      {
        id: {
          type: DataTypes.TEXT,
          allowNull: false,
          primaryKey: true,
        },
        entity: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        entity_id: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        width: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        height: {
          type: DataTypes.SMALLINT,
          allowNull: true,
        },
        url: {
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
        tableName: "thumbnails",
        schema: "public",
        underscored: true,
        timestamps: false,
        indexes: [
          {
            name: "thumbnails_pkey",
            unique: true,
            fields: [{ name: "id" }],
          },
        ],
      }
    );
    return thumbnails;
  }
}
