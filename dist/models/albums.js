"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.albums = void 0;
const sequelize_1 = require("sequelize");
class albums extends sequelize_1.Model {
    static initModel(sequelize) {
        albums.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            name: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            spotify_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            artist_id: {
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
            tableName: 'albums',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "albums_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return albums;
    }
}
exports.albums = albums;
//# sourceMappingURL=albums.js.map