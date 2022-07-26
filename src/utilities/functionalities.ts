import fs from 'fs'
import path from 'path'
const sharp = require('sharp')
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
export const originalPath = getImageDir(__dirname)
export const resizedPath = path.join(originalPath, 'resized')
export const resizeImage = (
  imageName: string,
  width: string,
  height: string
): Promise<void> => {
  return new Promise((resolve, _reject) => {
    resolve(
      sharp(`${originalPath}/${imageName}.jpg`)
        .resize({ width: parseInt(width), height: parseInt(height) })
        .toFile(`${resizedPath}/${imageName}_${width}_${height}.jpg`)
    )
  })
}
export const resizeWidth = (
  imageName: string,
  width: string
): Promise<void> => {
  return new Promise((resolve, _reject) => {
    resolve(
      sharp(`${originalPath}/${imageName}.jpg`)
        .resize({ width: parseInt(width) })
        .toFile(`${resizedPath}/${imageName}_Width${width}.jpg`)
    )
  })
}
export const resizeHeight = (
  imageName: string,
  height: string
): Promise<void> => {
  return new Promise((resolve, _reject) => {
    resolve(
      sharp(`${originalPath}/${imageName}.jpg`)
        .resize({ height: parseInt(height) })
        .toFile(`${resizedPath}/${imageName}_Height${height}.jpg`)
    )
  })
}
