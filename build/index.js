"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const api_1 = __importDefault(require("./routes/api"));
const app = (0, express_1.default)();
const port = 3000;
app.use('/api', api_1.default);
app.get('/', (_req, res) => {
    res.send('Hello!');
});
app.listen(port, () => {
    console.log(`click at http://localhost:${port}`);
});
exports.default = app;
