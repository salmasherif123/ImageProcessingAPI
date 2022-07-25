"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getImageDir = exports.resizeHeight = exports.resizeWidth = exports.resizeImage = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const sharp = require('sharp');
const originalPath = 'D:/vscode/imageProcessingProject/src/images/images/';
const resizedPath = 'D:/vscode/imageProcessingProject/src/images/images/resized/';
const resizeImage = (imageName, width, height) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
            resolve(sharp(`${originalPath}${imageName}.jpg`)
                .resize({ width: parseInt(width), height: parseInt(height) })
                .toFile(`${resizedPath}${imageName}_${width}_${height}.jpg`));
        }
        else {
            reject(new Error('Width or Height type is not accepted'));
        }
    });
};
exports.resizeImage = resizeImage;
const resizeWidth = (imageName, width) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(parseInt(width))) {
            resolve(sharp(`${originalPath}${imageName}.jpg`)
                .resize({ width: parseInt(width) })
                .toFile(`${resizedPath}${imageName}_Width${width}.jpg`));
        }
        else {
            reject(new Error('Width type is not accepted'));
        }
    });
};
exports.resizeWidth = resizeWidth;
const resizeHeight = (imageName, height) => {
    return new Promise((resolve, reject) => {
        if (!isNaN(parseInt(height))) {
            resolve(sharp(`${originalPath}${imageName}.jpg`)
                .resize({ height: parseInt(height) })
                .toFile(`${resizedPath}${imageName}_Height${height}.jpg`));
        }
        else {
            reject(new Error('Height type is not accepted'));
        }
    });
};
exports.resizeHeight = resizeHeight;
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
