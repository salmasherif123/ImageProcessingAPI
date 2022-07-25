import express from 'express'
import IP from './api/imageProcessing'

const routes = express.Router()
routes.get('/', (req, res) => {
  res.send('API Route')
})
routes.use('/imageprocessing', IP)
export default routes
