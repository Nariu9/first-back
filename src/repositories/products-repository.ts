// Data Access Layer

const products = [{id: 1, title: 'tomato'}, {id: 2, title: 'orange'}]

export const productsRepository = {
    findProducts(searchTerm: string | undefined) {
        if (searchTerm) {
            return products.filter(p => p.title.includes(searchTerm))
        } else {
            return products
        }
    },
    createProduct(productTitle: string) {
        const newProduct = {
            id: Date.now(),
            title: productTitle
        }
        products.push(newProduct)
        return newProduct
    },
    findProductById(productId: number) {
        return products.find(p => p.id === productId)
    },
    updateProduct(productId: number, productTitle: string) {
        const product = products.find(p => p.id === productId)
        if (product) {
            product.title = productTitle
            return true
        } else {
            return false
        }
    },
    deleteProduct(productId: number) {
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                products.splice(i, 1)
                return true
            }
        }
        return false
    }
}