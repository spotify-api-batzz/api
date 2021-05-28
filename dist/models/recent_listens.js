"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.recent_listens = void 0;
const sequelize_1 = require("sequelize");
class recent_listens extends sequelize_1.Model {
    static initModel(sequelize) {
        recent_listens.init({
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
            tableName: 'recent_listens',
            schema: 'public',
            timestamps: false,
            indexes: [
                {
                    name: "recent_listens_pkey",
                    unique: true,
                    fields: [
                        { name: "id" },
                    ]
                },
            ]
        });
        return recent_listens;
    }
}
exports.recent_listens = recent_listens;
//# sourceMappingURL=recent_listens.js.map