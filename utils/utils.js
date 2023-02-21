import { faker } from '@faker-js/faker'
faker.locale = 'es'

function generarProducto() {
    return {
        nombre: faker.commerce.productName(),
        descripcion: faker.commerce.productDescription(),
        imagen: faker.image.cats(),
        precio: faker.commerce.price()
    }
}

export { generarProducto }