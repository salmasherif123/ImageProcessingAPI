"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesName_1 = require("../../images/imagesName");
const functionalities_1 = require("../../utilities/functionalities");
const IP = express_1.default.Router();
let width, height, imageName;
IP.get('/', async (req, res) => {
    width = req.query.width;
    height = req.query.height;
    imageName = req.query.name;
    if (imageName === undefined) {
        res.status(406).send("Bad request, query parameter 'name' is missing");
    }
    else if (imagesName_1.original.includes(imageName + '.jpg') === false) {
        res.status(406).send(`${imageName}.jpg does not exist`);
    }
    else {
        if (width === undefined && typeof height === 'string') {
            let flag = false;
            if (!imagesName_1.resized.includes(`${imageName}_Height${height}.jpg`)) {
                try {
                    await (0, functionalities_1.resizeHeight)(imageName, height);
                }
                catch (error) {
                    flag = true;
                    res.status(406).send(error);
                }
            }
            if (!flag) {
                res.sendFile(`D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_Height${height}.jpg`);
            }
        }
        else if (height === undefined && typeof width === 'string') {
            let flag = false;
            if (!imagesName_1.resized.includes(`${imageName}_Width${width}.jpg`)) {
                try {
                    await (0, functionalities_1.resizeWidth)(imageName, width);
                }
                catch (error) {
                    res.status(406).send(error);
                    flag = true;
                }
            }
            if (!flag) {
                res.sendFile(`D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_Width${width}.jpg`);
            }
        }
        else if (width !== undefined && height !== undefined) {
            let flag = false;
            if (!imagesName_1.resized.includes(`${imageName}_${width}_${height}.jpg`)) {
                try {
                    await (0, functionalities_1.resizeImage)(imageName, width, height);
                }
                catch (error) {
                    flag = true;
                    res.status(406).send(error);
                }
            }
            if (!flag) {
                res.sendFile(`D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_${width}_${height}.jpg`);
            }
        }
        else if (width === undefined && height === undefined) {
            res.sendFile(`D:/vscode/imageProcessingProject/src/images/images/${imageName}.jpg`);
        }
    }
});
exports.default = IP;
