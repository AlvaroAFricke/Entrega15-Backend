import { Schema, model } from 'mongoose' 
import { Autor } from "./autores.js";

const chatCollName = 'chat'

const chat = {

    autor: Object,
    mensaje: {type: String, required: true}
    
}

import { normalize, schema } from 'normalizr'

// DEFINIR SCHEMAS

const autorSchema = new schema.Entity('autor', {}, {idAttribute: 'email'})

const mensajeSchema = new schema.Entity('mensaje', {autor: autorSchema}, {idAttribute: 'id'})

const chatsSchema = new schema.Entity('chat', {chat: mensajeSchema}, {idAttribute: 'id'})
