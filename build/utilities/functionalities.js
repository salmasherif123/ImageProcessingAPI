"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resizeHeight = exports.resizeWidth = exports.resizeImage = exports.resizedPath = exports.originalPath = exports.getImageDir = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp = require('sharp');
const getImageDir = (directory) => {
    if (fs_1.default.readdirSync(directory).includes('images')) {
        let dirPath = path_1.default.join(directory, 'images');
        if (fs_1.default.readdirSync(dirPath).includes('images')) {
            dirPath = path_1.default.join(dirPath, 'images');
            return dirPath;
        }
    }
    else if (fs_1.default.readdirSync(directory).includes('src')) {
        return (0, exports.getImageDir)(path_1.default.join(directory, 'src'));
    }
    directory = path_1.default.join(directory, '..');
    return (0, exports.getImageDir)(directory);
};
exports.getImageDir = getImageDir;
exports.originalPath = (0, exports.getImageDir)(__dirname);
exports.resizedPath = path_1.default.join(exports.originalPath, 'resized');
const resizeImage = (imageName, width, height) => {
    return new Promise((resolve, _reject) => {
        resolve(sharp(`${exports.originalPath}/${imageName}.jpg`)
            .resize({ width: parseInt(width), height: parseInt(height) })
            .toFile(`${exports.resizedPath}/${imageName}_${width}_${height}.jpg`));
    });
};
exports.resizeImage = resizeImage;
const resizeWidth = (imageName, width) => {
    return new Promise((resolve, _reject) => {
        resolve(sharp(`${exports.originalPath}/${imageName}.jpg`)
            .resize({ width: parseInt(width) })
            .toFile(`${exports.resizedPath}/${imageName}_Width${width}.jpg`));
    });
};
exports.resizeWidth = resizeWidth;
const resizeHeight = (imageName, height) => {
    return new Promise((resolve, _reject) => {
        resolve(sharp(`${exports.originalPath}/${imageName}.jpg`)
            .resize({ height: parseInt(height) })
            .toFile(`${exports.resizedPath}/${imageName}_Height${height}.jpg`));
    });
};
exports.resizeHeight = resizeHeight;
