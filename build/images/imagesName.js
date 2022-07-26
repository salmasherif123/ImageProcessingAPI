"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resized = exports.original = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const functionalities_1 = require("../utilities/functionalities");
const dir = (0, functionalities_1.getImageDir)(__dirname);
exports.original = fs_1.default.readdirSync(dir);
exports.resized = fs_1.default.readdirSync(path_1.default.join(dir, 'resized'));
