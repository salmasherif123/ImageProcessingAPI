"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resized = exports.original = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
exports.original = fs_1.default.readdirSync(path_1.default.join(__dirname, '..', '..', 'src', 'images', 'images'));
exports.resized = fs_1.default.readdirSync(path_1.default.join(__dirname, '..', '..', 'src', 'images', 'images', 'resized'));
