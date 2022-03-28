"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const db_1 = __importDefault(require("./config/db"));
const user_1 = __importDefault(require("./routes/user"));
const normal_1 = __importDefault(require("./routes/normal"));
const app = (0, express_1.default)();
const port = 4000;
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, db_1.default)();
app.use('/', user_1.default);
app.use('/', normal_1.default);
app.listen(port, () => {
    console.log(`listning on ${port}`);
});
