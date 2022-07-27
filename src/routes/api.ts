import express,{Request,Response} from 'express'
import IP from './api/imageProcessing'

const routes = express.Router()
routes.get('/', (req:Request, res:Response):void => {
  res.send('API Route')
})
routes.use('/imageprocessing', IP)
export default routes
