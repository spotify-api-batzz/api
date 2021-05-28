"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.thumbnails = void 0;
const sequelize_1 = require("sequelize");
class thumbnails extends sequelize_1.Model {
    static initModel(sequelize) {
        thumbnails.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            entity: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            entity_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            width: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: true
            },
            height: {
                type: sequelize_1.DataTypes.SMALLINT,
                allowNull: true
            },
            url: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            created_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            },
            updated_at: {
                type: sequelize_1.DataTypes.DATE,
                allowNull: true
            }
        }, {
            sequelize,
            tableName: 'thumbnails',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "thumbnails_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return thumbnails;
    }
}
exports.thumbnails = thumbnails;
//# sourceMappingURL=thumbnails.js.map