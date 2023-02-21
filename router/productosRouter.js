import express from 'express'
import ApiProductosMock from '../api/productos.js'

class ProductosRouter extends express.Router {
    constructor() {
        super()

        const apiProductos = new ApiProductosMock()

        this.post('/test', async (req, res, next) => {
            try {
                const test = apiProductos.producir(5)
                res.render('index', {productos: test})
            } catch (error) {
                next(error)
            }
        })

        this.get('/', async (req, res, next) => {
            try {
                res.render('index', {productos: apiProductos.getAll()})
            } catch (error) {
                next(error)
            }
        })

        this.get('/:id', async (req, res, next) => {
            try {
                res.json(await apiProductos.getById(req.params.id))
            } catch (error) {
                next(error)
            }
        })

        this.post('/', async (req, res, next) => {
            try {
                res.json(await apiProductos.save(req.body))
            } catch (error) {
                next(error)
            }
        })

        this.put('/:id', async (req, res, next) => {
            try {
                res.json(await apiProductos.update({...req.body, id: req.params.id}))
            } catch (error) {
                next(error)
            }
        })

        this.delete('/:id?', async (req, res, next) => {
            try {
                const id = Number(req.params.id)
                if(id){
                    await apiProductos.deleteById(req.params.id)
                    res.json({Borrado: 'OK'})
                }else{
                    await apiProductos.deleteAll()
                    res.json({Borrado: 'OK'})
                }
            } catch (error) {
                next(error)
            }
        })
    }
}

export default ProductosRouter