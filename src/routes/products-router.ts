import {Request, Response, Router} from 'express';
import {productsRepository, ProductType} from '../repositories/products-repository';
import {body} from 'express-validator';
import {inputValidationMiddleware} from '../middlewares/input-validation-middleware';


//Presentation Layer

export const productsRouter = Router({})

const titleValidation = body('title').trim().isLength({
    min: 3,
    max: 15
}).withMessage('Title length should be from 3 to 15 symbols')

productsRouter.get('/', async (req: Request, res: Response) => {
    const foundProducts: ProductType[] = await productsRepository.findProducts(req.query.title?.toString())

    res.send(foundProducts)
})

productsRouter.post('/', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const newProduct: ProductType = await productsRepository.createProduct(req.body.title)
    res.status(201).send(newProduct)
})

productsRouter.get('/:id', async (req: Request, res: Response) => {
    const product: ProductType | undefined = await productsRepository.findProductById(+req.params.id)
    if (product) {
        res.send(product)
    } else {
        res.send(404)
    }
})

productsRouter.put('/:id', titleValidation, inputValidationMiddleware, async (req: Request, res: Response) => {
    const isUpdated = await productsRepository.updateProduct(+req.params.id, req.body.title)
    if (isUpdated) {
        res.status(200).send(productsRepository.findProductById(+req.params.id))
    } else {
        res.send(404)
    }
})

productsRouter.delete('/:id', async (req: Request, res: Response) => {
    const isDeleted = await productsRepository.deleteProduct(+req.params.id)
    if (isDeleted) {
        res.send(204)
    } else {
        res.send(404)
    }
})
