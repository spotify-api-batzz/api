"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.songs = void 0;
const sequelize_1 = require("sequelize");
class songs extends sequelize_1.Model {
    static initModel(sequelize) {
        songs.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            spotify_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            album_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            artist_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            name: {
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
            tableName: 'songs',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "songs_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return songs;
    }
}
exports.songs = songs;
//# sourceMappingURL=songs.js.map