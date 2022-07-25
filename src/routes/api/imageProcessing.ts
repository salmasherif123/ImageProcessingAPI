import express from 'express'
import { original, resized } from '../../images/imagesName'
import {
  resizeImage,
  resizeHeight,
  resizeWidth,
} from '../../utilities/functionalities'
const IP = express.Router()

let width: string, height: string, imageName: string
IP.get('/', async (req, res) => {
  width = req.query.width as string
  height = req.query.height as string
  imageName = req.query.name as string
  if (imageName === undefined) {
    res.status(400).send("Bad request, query parameter 'name' is missing")
  } else if (original.includes(imageName + '.jpg') === false) {
    res.status(406).send(`${imageName}.jpg does not exist`)
  } else {
    if (width === undefined && typeof height === 'string') {
      let flag: Boolean = false
      if (!resized.includes(`${imageName}_Height${height}.jpg`)) {
        try {
          await resizeHeight(imageName, height)
        } catch (error) {
          flag = true
          res.status(406).send(error)
        }
      }
      if (!flag) {
        res.sendFile(
          `D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_Height${height}.jpg`
        )
      }
    } else if (height === undefined && typeof width === 'string') {
      let flag: Boolean = false
      if (!resized.includes(`${imageName}_Width${width}.jpg`)) {
        try {
          await resizeWidth(imageName, width)
        } catch (error) {
          res.status(406).send(error)
          flag = true
        }
      }
      if (!flag) {
        res.sendFile(
          `D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_Width${width}.jpg`
        )
      }
    } else if (width !== undefined && height !== undefined) {
      let flag: Boolean = false
      if (!resized.includes(`${imageName}_${width}_${height}.jpg`)) {
        try {
          await resizeImage(imageName, width, height)
        } catch (error) {
          flag = true
          res.status(406).send(error)
        }
      }
      if (!flag) {
        res.sendFile(
          `D:/vscode/imageProcessingProject/src/images/images/resized/${imageName}_${width}_${height}.jpg`
        )
      }
    } else if (width === undefined && height === undefined) {
      res.sendFile(
        `D:/vscode/imageProcessingProject/src/images/images/${imageName}.jpg`
      )
    }
  }
})
export default IP
