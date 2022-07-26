import express, { Response, Request } from 'express'
import routes from './routes/api'

const app = express()
const port = 3000

app.use('/api', routes)

app.get('/', (_req: Request, res: Response): void => {
  res.send('Hello!')
})

app.listen(port, () => {
  console.log(`click at http://localhost:${port}`)
})

export default app
