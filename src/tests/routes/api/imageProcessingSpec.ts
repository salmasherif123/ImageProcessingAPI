/* eslint no-undef:"off" */
import supertest from 'supertest'
import app from '../../../index'
import path from 'path'
import fs from 'fs'
import { getImageDir } from '../../../utilities/functionalities'
const request = supertest(app)
const dir = getImageDir(__dirname)
describe('API Server Testing', () => {
  const validImageName: string = 'icelandwaterfall'
  const invalidImageName = 'invalid'
  const url = path.join(dir, 'resized')
  let width: undefined | number = 300
  let height: undefined | number = 400
  it('valid file name', async () => {
    const res = await request.get('/api/imageprocessing?name=' + validImageName)
    expect(res.status).toBe(200)
  })
  it('invalid file name', async () => {
    const res = await request.get(
      `/api/imageprocessing?name=${invalidImageName}`
    )
    expect(res.status).toBe(406)
  })
  it('width and height data type correctness & image existance', async () => {
    const imagePath = path.join(url, `${validImageName}_${width}_${height}.jpg`)
    const res = await request.get(
      `/api/imageprocessing?name=${validImageName}&width=${width}&height=${height}`
    )
    expect(res.status).toBe(200)
    const isExist = fs.existsSync(imagePath)
    expect(isExist).toBeTrue()
  })
  it('width data type correctness and image existance', async () => {
    height = undefined
    const imagePath = path.join(url, `${validImageName}_Width${width}.jpg`)
    const res = await request.get(
      `/api/imageprocessing?name=${validImageName}&width=${width}`
    )
    expect(res.status).toBe(200)
    const isExist = fs.existsSync(imagePath)
    expect(isExist).toBeTrue()
    height = 400
  })
  it('height data type correctness and image existance', async () => {
    width = undefined
    const imagePath = path.join(url, `${validImageName}_Height${height}.jpg`)
    const res = await request.get(
      `/api/imageprocessing?name=${validImageName}&height=${height}`
    )
    expect(res.status).toBe(200)
    const isExist = fs.existsSync(imagePath)
    expect(isExist).toBeTrue()
    width = 300
  })
})
