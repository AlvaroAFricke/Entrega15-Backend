import { set, connect } from 'mongoose'
import modelo from '../modelos/modelUsuarios.js'

class ContenedorUsuarios {

    constructor() {
        set({ strictQuery: true })
        this.connect = connect('mongodb+srv://alviafricke:pruebamongo@baseprueba.uuv5218.mongodb.net/Usuarios', { useNewUrlParser: true, useUnifiedTopology: true })
    }

    async getAll() {
        try {
            const users = await modelo.find()
            return users
        } catch (error) {
            console.log(error);
        }
    }

    async getUser(nombre){
        try {
            const prod = await modelo.findOne({nombre: nombre})
            return prod
        } catch (error) {
            
        }
    }

    async save(Objeto) {
        try {
            await modelo.insertMany(Objeto)
        } catch (error) {
            console.log('Error en el guardado.');
        }
        return Objeto.id;
    }

    //Borrado de todo
    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            console.log(error);
        }
    }

}

export default ContenedorUsuarios