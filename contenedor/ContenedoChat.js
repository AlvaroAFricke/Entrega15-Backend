import { set, connect } from 'mongoose'
import modelo from '../modelos/modelChat.js'

class ContenedorChatuctosMongo {

    constructor() {
        set({ strictQuery: true })
        this.connect = connect('mongodb://localhost/chats', { useNewUrlParser: true, useUnifiedTopology: true })
    }

    async getAll() {
        try {
            const chats = await modelo.find()
            return chats
        } catch (error) {
            console.log(error);
        }
    }

    async getMensajesById(id) {
        try {
            const autor = await modelo.findOne({autor: id})
            return autor.mensajes
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
    }

    //Borrado de todo
    async deleteAll() {
        try {
            await modelo.deleteMany({})
        } catch (error) {
            console.log(error);
        }
    }

    async deleteById(id) {
        try {
            await modelo.deleteOne({ autor: id })
        } catch (error) {
            console.log(error)
        }
    }

}

export default ContenedorChatuctosMongo