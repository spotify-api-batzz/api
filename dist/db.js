"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.instance = exports.ConnectToDB = void 0;
const sequelize_1 = require("sequelize");
let instance;
exports.instance = instance;
const ConnectToDB = (connstring) => {
    if (!instance) {
        exports.instance = instance = new sequelize_1.Sequelize(connstring);
    }
};
exports.ConnectToDB = ConnectToDB;
//# sourceMappingURL=db.js.map