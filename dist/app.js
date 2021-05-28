"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("./db");
const express_1 = __importDefault(require("express"));
const init_models_1 = require("models/init-models");
const ramda_1 = require("ramda");
var app = express_1.default();
db_1.ConnectToDB("postgres://test:123@192.168.0.27:5432/spotify");
let models = init_models_1.initModels(db_1.instance);
const pagination = (opts) => { };
Object.keys(models).forEach((key) => {
    app.get(`/${key}`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        let items = yield models[key].findAll(ramda_1.omit());
        res.send(items);
    }));
});
app.listen(3000);
//# sourceMappingURL=app.js.map