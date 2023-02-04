// Data Access Layer

export type ProductType = {
    id: number
    title: string
}

const products: ProductType[] = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    async findProducts(searchTerm: string | undefined): Promise<ProductType[]> {
        if (searchTerm) {
            return products.filter(p => p.title.includes(searchTerm))
        } else {
            return products
        }
    },
    async createProduct(productTitle: string): Promise<ProductType> {
        const newProduct = {
            id: Date.now(),
            title: productTitle
        }
        products.push(newProduct)
        return newProduct
    },
    async findProductById(productId: number) :Promise<ProductType | undefined> {
        return products.find(p => p.id === productId)
    },
    async updateProduct(productId: number, productTitle: string): Promise<boolean> {
        const product = products.find(p => p.id === productId)
        if (product) {
            product.title = productTitle
            return true
        } else {
            return false
        }
    },
    async deleteProduct(productId: number): Promise<boolean> {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}