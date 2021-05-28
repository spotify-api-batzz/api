"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.top_songs = void 0;
const sequelize_1 = require("sequelize");
class top_songs extends sequelize_1.Model {
    static initModel(sequelize) {
        top_songs.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            user_id: {
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
            tableName: 'top_songs',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "top_songs_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return top_songs;
    }
}
exports.top_songs = top_songs;
//# sourceMappingURL=top_songs.js.map