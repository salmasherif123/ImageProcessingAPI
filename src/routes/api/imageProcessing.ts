import express, { Request, Response } from 'express'
import { original, resized } from '../../images/imagesName'
import {
  resizeImage,
  resizeHeight,
  resizeWidth,
  getImageDir
} from '../../utilities/functionalities'
import path from 'path'
const IP = express.Router()
let width: string, height: string, imageName: string
IP.get('/', async (req: Request, res: Response): Promise<void> => {
  width = req.query.width as string
  height = req.query.height as string
  imageName = req.query.name as string
  const dir = getImageDir(__dirname)
  const resizedImgPath = path.join(dir, 'resized')
  if (imageName === undefined) {
    res.status(400).send("Bad request, query parameter 'name' is missing")
  } else if (original.includes(imageName + '.jpg') === false) {
    res.status(406).send(`${imageName}.jpg does not exist`)
  } else {
    if (isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
      if (!resized.includes(`${imageName}_Height${height}.jpg`)) {
        await resizeHeight(imageName, height)
      }
      res.sendFile(`${resizedImgPath}/${imageName}_Height${height}.jpg`)
    } else if (isNaN(parseInt(height)) && !isNaN(parseInt(width))) {
      if (!resized.includes(`${imageName}_Width${width}.jpg`)) {
        await resizeWidth(imageName, width)
      }
      res.sendFile(`${resizedImgPath}/${imageName}_Width${width}.jpg`)
    } else if (!isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
      if (!resized.includes(`${imageName}_${width}_${height}.jpg`)) {
        await resizeImage(imageName, width, height)
      }
      res.sendFile(`${resizedImgPath}/${imageName}_${width}_${height}.jpg`)
    } else {
      if (!width && !height) {
        res.sendFile(`${dir}/${imageName}.jpg`)
      } else {
        if (
          isNaN(parseInt(width)) &&
          width &&
          isNaN(parseInt(height)) &&
          height
        ) {
          res.status(400).json('Warning: width and height must be numbers')
        } else if (isNaN(parseInt(width)) && width) {
          res.status(400).json('Warning: width must be a number')
        } else if (isNaN(parseInt(height)) && height) {
          res.status(400).json('Warning: height must be a number')
        }
      }
    }
  }
})
export default IP
