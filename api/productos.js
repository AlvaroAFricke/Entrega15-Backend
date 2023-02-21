import Contenedor from "../contenedor/Contenedor.js"
import { generarProducto } from '../utils/utils.js'

class ApiProductosMock extends Contenedor {
    constructor() {
        super()
    }

    producir(cant) {
        const productos = []
        for (let i = 0; i < cant; i++) {
            const prodNuevo = generarProducto()
            productos.push(prodNuevo)
        }
        return productos
    }
}

export default ApiProductosMock
