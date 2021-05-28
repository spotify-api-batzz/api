"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.top_song_data = void 0;
const sequelize_1 = require("sequelize");
class top_song_data extends sequelize_1.Model {
    static initModel(sequelize) {
        top_song_data.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            song_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            top_song_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            order: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: true
            },
            time_period: {
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
            tableName: 'top_song_data',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "top_song_data_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return top_song_data;
    }
}
exports.top_song_data = top_song_data;
//# sourceMappingURL=top_song_data.js.map