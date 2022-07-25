import fs from 'fs'
import path from 'path'
const sharp = require('sharp')
const originalPath: string =
  'D:/vscode/imageProcessingProject/src/images/images/'
const resizedPath: string =
  'D:/vscode/imageProcessingProject/src/images/images/resized/'

export const resizeImage = (
  imageName: string,
  width: string,
  height: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isNaN(parseInt(width)) && !isNaN(parseInt(height))) {
      resolve(
        sharp(`${originalPath}${imageName}.jpg`)
          .resize({ width: parseInt(width), height: parseInt(height) })
          .toFile(`${resizedPath}${imageName}_${width}_${height}.jpg`)
      )
    } else {
      reject(new Error('Width or Height type is not accepted'))
    }
  })
}
export const resizeWidth = (
  imageName: string,
  width: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isNaN(parseInt(width))) {
      resolve(
        sharp(`${originalPath}${imageName}.jpg`)
          .resize({ width: parseInt(width) })
          .toFile(`${resizedPath}${imageName}_Width${width}.jpg`)
      )
    } else {
      reject(new Error('Width type is not accepted'))
    }
  })
}
export const resizeHeight = (
  imageName: string,
  height: string
): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isNaN(parseInt(height))) {
      resolve(
        sharp(`${originalPath}${imageName}.jpg`)
          .resize({ height: parseInt(height) })
          .toFile(`${resizedPath}${imageName}_Height${height}.jpg`)
      )
    } else {
      reject(new Error('Height type is not accepted'))
    }
  })
}
export const getImageDir = (directory: string): string => {
  if (fs.readdirSync(directory).includes('images')) {
    let dirPath = path.join(directory, 'images')
    if (fs.readdirSync(dirPath).includes('images')) {
      dirPath = path.join(dirPath, 'images')
      return dirPath
    }
  } else if (fs.readdirSync(directory).includes('src')) {
    return getImageDir(path.join(directory, 'src'))
  }
  directory = path.join(directory, '..')
  return getImageDir(directory)
}
