"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
const sequelize_1 = require("sequelize");
class users extends sequelize_1.Model {
    static initModel(sequelize) {
        users.init({
            id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: false,
                primaryKey: true
            },
            spotify_id: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            username: {
                type: sequelize_1.DataTypes.TEXT,
                allowNull: true
            },
            password: {
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
            tableName: 'users',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "users_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return users;
    }
}
exports.users = users;
//# sourceMappingURL=users.js.map