/* eslint no-undef:"off" */
import supertest from 'supertest'
import app from '../../../index'
import path from 'path'
import fs from 'fs'
import { getImageDir, resizeImage } from '../../../utilities/functionalities'
const request = supertest(app)
const dir = getImageDir(__dirname)
describe('API Server Testing', () => {
  const validImageName: string = 'icelandwaterfall'
  const invalidImageName = 'invalid'
  const url = path.join(dir, 'resized')
  const width: undefined | number |string = 300
  let height: undefined | number |string = 500
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
  it('resize image function', async() => {
    await resizeImage(validImageName, width as unknown as string, height as unknown as string)
    let imagePath = `${validImageName}_${width}_${height}.jpg` 
    imagePath = path.join(dir, 'resized', imagePath)
    const isExists = fs.existsSync(imagePath)
    expect(isExists).toBeTrue()
  })
  it('resized image with both width and height existance', async () => {
    const imagePath = path.join(url, `${validImageName}_${width}_${height}.jpg`)
    const res = await request.get(
      `/api/imageprocessing?name=${validImageName}&width=${width}&height=${height}`
    )
    expect(res.status).toBe(200)
    const isExist = fs.existsSync(imagePath)
    expect(isExist).toBeTrue()
  })
  it('resized image with width existance', async () => {
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
  it('resized image with height existance', async () => {
    const res = await request.get(
      `/api/imageprocessing?name=${validImageName}&height=${height}`
    )
    expect(res.status).toBe(200)
  })
  it('data type correctness', async () => {
    const w = 'a'
    const h = 'a'
    if (isNaN(parseInt(w)) && w) {
      const res = await request.get(
        `/api/imageprocessing?name=${validImageName}&width=${w}`
      )
      expect(res.status).toBe(400)
    }
    if (isNaN(parseInt(h)) && h) {
      const res = await request.get(
        `/api/imageprocessing?name=${validImageName}&height=${h}`
      )
      expect(res.status).toBe(400)
    }
    if (isNaN(parseInt(w)) && w && isNaN(parseInt(h)) && h) {
      const res = await request.get(
        `/api/imageprocessing?name=${validImageName}&width=${w}&height=${h}`
      )
      expect(res.status).toBe(400)
    }
  })
})
