"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint no-undef:"off" */
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../../../index"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const functionalities_1 = require("../../../utilities/functionalities");
const request = (0, supertest_1.default)(index_1.default);
const dir = (0, functionalities_1.getImageDir)(__dirname);
describe('API Server Testing', () => {
    const validImageName = 'icelandwaterfall';
    const invalidImageName = 'invalid';
    const url = path_1.default.join(dir, 'resized');
    let width = 300;
    let height = 400;
    it('valid file name', async () => {
        const res = await request.get('/api/imageprocessing?name=' + validImageName);
        expect(res.status).toBe(200);
    });
    it('invalid file name', async () => {
        const res = await request.get(`/api/imageprocessing?name=${invalidImageName}`);
        expect(res.status).toBe(406);
    });
    it('width and height data type correctness & image existance', async () => {
        const imagePath = path_1.default.join(url, `${validImageName}_${width}_${height}.jpg`);
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${width}&height=${height}`);
        expect(res.status).toBe(200);
        const isExist = fs_1.default.existsSync(imagePath);
        expect(isExist).toBeTrue();
    });
    it('width data type correctness and image existance', async () => {
        height = undefined;
        const imagePath = path_1.default.join(url, `${validImageName}_Width${width}.jpg`);
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${width}`);
        expect(res.status).toBe(200);
        const isExist = fs_1.default.existsSync(imagePath);
        expect(isExist).toBeTrue();
        height = 400;
    });
    it('height data type correctness and image existance', async () => {
        width = undefined;
        const imagePath = path_1.default.join(url, `${validImageName}_Height${height}.jpg`);
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&height=${height}`);
        expect(res.status).toBe(200);
        const isExist = fs_1.default.existsSync(imagePath);
        expect(isExist).toBeTrue();
        width = 300;
    });
});
