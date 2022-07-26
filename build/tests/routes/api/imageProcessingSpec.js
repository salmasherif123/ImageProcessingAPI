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
    it('resized image with both width and height existance', async () => {
        const imagePath = path_1.default.join(url, `${validImageName}_${width}_${height}.jpg`);
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${width}&height=${height}`);
        expect(res.status).toBe(200);
        const isExist = fs_1.default.existsSync(imagePath);
        expect(isExist).toBeTrue();
    });
    it('resized image with width existance', async () => {
        height = undefined;
        const imagePath = path_1.default.join(url, `${validImageName}_Width${width}.jpg`);
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${width}`);
        expect(res.status).toBe(200);
        const isExist = fs_1.default.existsSync(imagePath);
        expect(isExist).toBeTrue();
        height = 400;
    });
    it('resized image with height existance', async () => {
        const res = await request.get(`/api/imageprocessing?name=${validImageName}&height=${height}`);
        expect(res.status).toBe(200);
    });
    it('data type correctness', async () => {
        const w = 'a', h = 'a';
        if (isNaN(parseInt(w)) && w) {
            const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${w}`);
            expect(res.status).toBe(400);
        }
        if (isNaN(parseInt(h)) && h) {
            const res = await request.get(`/api/imageprocessing?name=${validImageName}&height=${h}`);
            expect(res.status).toBe(400);
        }
        if (isNaN(parseInt(w)) && w && isNaN(parseInt(h)) && h) {
            const res = await request.get(`/api/imageprocessing?name=${validImageName}&width=${w}&height=${h}`);
            expect(res.status).toBe(400);
        }
    });
});
