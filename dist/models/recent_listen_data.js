"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recent_listen_data = void 0;
const sequelize_1 = require("sequelize");
class recent_listen_data extends sequelize_1.Model {
    static initModel(sequelize) {
        recent_listen_data.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            song_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            recent_listen_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            played_at: {
                type: sequelize_1.DataTypes.DATE,
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
            tableName: 'recent_listen_data',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "recent_listen_data_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return recent_listen_data;
    }
}
exports.recent_listen_data = recent_listen_data;
//# sourceMappingURL=recent_listen_data.js.map