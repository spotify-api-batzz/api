"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.top_artist_data = void 0;
const sequelize_1 = require("sequelize");
class top_artist_data extends sequelize_1.Model {
    static initModel(sequelize) {
        top_artist_data.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            artist_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            top_artist_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            time_period: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            order: {
                type: sequelize_1.DataTypes.INTEGER,
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
            tableName: 'top_artist_data',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "top_artist_data_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return top_artist_data;
    }
}
exports.top_artist_data = top_artist_data;
//# sourceMappingURL=top_artist_data.js.map