import express from 'express'
import bodyParser from 'body-parser';
import {productsRouter} from './routes/products-router';
import {addressesRouter} from './routes/addresses-router';
import {runDb} from './repositories/db';

const app = express()
const port = process.env.PORT || 5000


const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.use('/products', productsRouter)
app.use('/addresses', addressesRouter)


app.get('/', (req, res) => {
    res.send('Hello from back-end')
})


/*
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})*/

const startApp = async () => {
    await runDb()
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    })
}

startApp()