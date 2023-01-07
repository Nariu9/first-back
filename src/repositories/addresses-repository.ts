// Data Access Layer

const addresses = [{id: 1, value: 'Street 1'}, {id: 2, value: 'Street 2'}]

export const addressesRepository = {
    getAddresses() {
        return addresses
    },
    findAddressById(productId: number) {
        return addresses.find(p => p.id === productId)
    },
}