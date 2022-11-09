import express, {Request, Response} from 'express'
import bodyParser from 'body-parser';

const app = express()
const port = process.env.PORT || 5000

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]
const addresses = [{id: 1, value: 'Street 1'}, {id: 2, value: 'Street 2'}]

const parserMiddleware = bodyParser({})
app.use(parserMiddleware)

app.get('/products', (req: Request, res: Response) => {
    if (req.query.title) {
        const searchString = req.query.title.toString();
        res.send(products.filter(p => p.title.includes(searchString)))
    } else {
        res.send(products)
    }
})
app.get('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})
app.delete('/products/:id', (req: Request, res: Response) => {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === +req.params.id) {
            products.splice(i, 1)
            res.send(204)
            return
        }
    }
    res.send(404)
})
app.post('/products', (req: Request, res: Response) => {
    const newProduct = {
        id: Date.now(),
        title: req.body.title
    }
    products.push(newProduct)
    res.status(201).send(newProduct)
})
app.put('/products/:id', (req: Request, res: Response) => {
    const product = products.find(p => p.id === +req.params.id)
    if (product) {
        product.title = req.body.title
        res.status(200).send(product)
    } else {
        res.send(404)
    }
})

app.get('/addresses', (req: Request, res: Response) => {
    res.send(addresses)
})
app.get('/addresses/:id', (req: Request, res: Response) => {
    const address = addresses.find(a => a.id === +req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }

})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})