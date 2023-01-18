import express, {NextFunction, Response, Request} from 'express'
import bodyParser from 'body-parser';
import {productsRouter} from './routes/products-router';
import {addressesRouter} from './routes/addresses-router';

const app = express()
const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)

const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.query.token === '123') {
        next()
    } else {
        res.send(401)
    }
}

let requestCounter = 0

const requestCounterMiddleware = (req: Request, res: Response, next: NextFunction) => {
    requestCounter++
    next()
}

app.use(requestCounterMiddleware)
app.use(authGuardMiddleware)

app.get('/', (req, res) => {
    res.send({value: 'count of requests ' + requestCounter})
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})