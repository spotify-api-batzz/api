"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.artists = void 0;
const sequelize_1 = require("sequelize");
class artists extends sequelize_1.Model {
    static initModel(sequelize) {
        artists.init({
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
            tableName: 'artists',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "artists_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return artists;
    }
}
exports.artists = artists;
//# sourceMappingURL=artists.js.map