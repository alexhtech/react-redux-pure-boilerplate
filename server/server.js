import {resolve} from 'path'
import express from 'express'
import cookieParser from 'cookie-parser'
import serverMiddleware from './serverMiddleware'


const app = express()

app.use(cookieParser())
app.use('/public', express.static(resolve(__dirname, '../public')))
app.use(serverMiddleware)


app.listen(3000, () => {
    console.log('Page server is listening on port 3000!')
})
