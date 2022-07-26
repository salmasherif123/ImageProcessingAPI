"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const imagesName_1 = require("../../images/imagesName");
const functionalities_1 = require("../../utilities/functionalities");
const path_1 = __importDefault(require("path"));
const IP = express_1.default.Router();
let width, height, imageName;
IP.get('/', async (req, res) => {
    width = req.query.width;
    height = req.query.height;
    imageName = req.query.name;
    const dir = (0, functionalities_1.getImageDir)(__dirname);
    const resizedImgPath = path_1.default.join(dir, 'resized');
    if (imageName === undefined) {
        res.sendStatus(400).send("Bad request, query parameter 'name' is missing");
    }
    else if (imagesName_1.original.includes(imageName + '.jpg') === false) {
        res.status(406).send(`${imageName}.jpg does not exist`);
    }
    else {
        if (isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
            if (!imagesName_1.resized.includes(`${imageName}_Height${height}.jpg`)) {
                await (0, functionalities_1.resizeHeight)(imageName, height);
            }
            res.sendFile(`${resizedImgPath}/${imageName}_Height${height}.jpg`);
        }
        else if (isNaN(parseInt(height)) && !isNaN(parseInt(width))) {
            if (!imagesName_1.resized.includes(`${imageName}_Width${width}.jpg`)) {
                await (0, functionalities_1.resizeWidth)(imageName, width);
            }
            res.sendFile(`${resizedImgPath}/${imageName}_Width${width}.jpg`);
        }
        else if (!isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
            if (!imagesName_1.resized.includes(`${imageName}_${width}_${height}.jpg`)) {
                await (0, functionalities_1.resizeImage)(imageName, width, height);
            }
            res.sendFile(`${resizedImgPath}/${imageName}_${width}_${height}.jpg`);
        }
        else {
            if (!width && !height) {
                res.sendFile(`${dir}/${imageName}.jpg`);
            }
            else {
                if ((isNaN(parseInt(width)) && width) && (isNaN(parseInt(height)) && height)) {
                    res.status(400).json('Warning: width and height must be numbers');
                }
                else if ((isNaN(parseInt(width)) && width)) {
                    res.status(400).json('Warning: width must be a number');
                }
                else if ((isNaN(parseInt(height)) && height)) {
                    res.status(400).json('Warning: height must be a number');
                }
            }
        }
    }
});
exports.default = IP;
