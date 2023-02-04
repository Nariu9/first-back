// Data Access Layer

import {productsCollection, ProductType} from './db';

export const productsRepository = {
    async findProducts(searchTerm: string | undefined): Promise<ProductType[]> {
        const filter: any = {}

        if (searchTerm) {
            filter.title = {$regex: searchTerm}
        }
        return productsCollection.find(filter).toArray()
    },
    async createProduct(productTitle: string): Promise<ProductType> {
        const newProduct = {
            id: Date.now(),
            title: productTitle
        }
        const result = await productsCollection.insertOne(newProduct)
        return newProduct
    },
    async findProductById(productId: number): Promise<ProductType | undefined> {
        const product = await productsCollection.findOne({id: productId})
        if (product) {
            return product
        } else {
            return undefined
        }
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        const result = await productsCollection.updateOne({id: productId}, {$set: {title: productTitle}})
        return result.matchedCount === 1
    },
    async deleteProduct(productId: number): Promise<boolean> {
        const result = await productsCollection.deleteOne({id: productId})
        return result.deletedCount === 1
    }
}