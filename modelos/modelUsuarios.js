import { Schema, model } from 'mongoose' 

const usuariosCollName = 'usuarios'

const usuariosSchema = new Schema({

    nombre: {type: String, required: true},
    correo: {type: String, require: true},
    password: {type: String, required: true}
    
})

const usuarios = model(usuariosCollName, usuariosSchema)

export default usuarios