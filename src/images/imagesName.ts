import fs from 'fs'
import path from 'path'
export const original: string[] = fs.readdirSync(
  path.join(__dirname, '..', '..', 'src', 'images', 'images')
)
export const resized: string[] = fs.readdirSync(
  path.join(__dirname, '..', '..', 'src', 'images', 'images', 'resized')
)
