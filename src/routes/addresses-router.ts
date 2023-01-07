import {Request, Response, Router} from 'express';
import {addressesRepository} from '../repositories/addresses-repository';

//Presentation Layer

export const addressesRouter = Router({})

addressesRouter.get('/', (req: Request, res: Response) => {
    res.send(addressesRepository.getAddresses())
})
addressesRouter.get('/:id', (req: Request, res: Response) => {
    const address = addressesRepository.findAddressById(+req.params.id)
    if (address) {
        res.send(address)
    } else {
        res.send(404)
    }
})