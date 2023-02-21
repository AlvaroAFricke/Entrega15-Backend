import { set, connect } from 'mongoose'
import modelo from '../modelos/modelProducto.js'

class ContenedorProductosMongo {

    constructor() {
        set({ strictQuery: true })
        this.connect = connect('mongodb://localhost/productos', { useNewUrlParser: true, useUnifiedTopology: true })
    }

    async getAll() {
        try {
            const prods = await modelo.find()
            return prods
        } catch (error) {
            console.log(error);
        }
    }

    async getById(cod) {
        try {
            const prod = await modelo.findOne({codigo: cod})
            return prod
        } catch (error) {
            console.log(error);
        }
    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
        } catch (error) {
            console.log(error);
        }
        return Objeto.id;
    }

    async update(cod, Objeto) {
        try {
            await modelo.updateOne({ codigo: cod }, { 
                nombre: Objeto.nombre,
                descripcion: Objeto.descripcion,
                imagen: Objeto.imagen,
                precio: Objeto.precio,
            })
        } catch (error) {
            console.log(error);
        }
    }

    //Borrado de todo
    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(cod) {
        try {
            await modelo.deleteOne({ codigo: cod })
        } catch (error) {
            console.log(error)
        }
    }

}

export default ContenedorProductosMongo