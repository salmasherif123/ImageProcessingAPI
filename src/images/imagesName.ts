import fs from 'fs'
import path from 'path'
import { getImageDir } from '../utilities/functionalities'

const dir = getImageDir(__dirname)
export const original: string[] = fs.readdirSync(dir)
export const resized: string[] = fs.readdirSync(path.join(dir, 'resized'))
