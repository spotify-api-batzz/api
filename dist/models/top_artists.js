"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.top_artists = void 0;
const sequelize_1 = require("sequelize");
class top_artists extends sequelize_1.Model {
    static initModel(sequelize) {
        top_artists.init({
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
            tableName: 'top_artists',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "top_artists_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return top_artists;
    }
}
exports.top_artists = top_artists;
//# sourceMappingURL=top_artists.js.map