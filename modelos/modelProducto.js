import { Schema, model } from 'mongoose' 

const productosCollName = 'productos'

const productosSchema = new Schema({

    nombre: {type: String, required: true},
    descripcion: {type: String, required: true},
    imagen: {type: String, required: true},
    precio: {type: String, required: true}
    
})

const productos = model(productosCollName, productosSchema)

export default productos