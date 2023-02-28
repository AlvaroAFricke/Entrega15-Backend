import express from 'express'
import session from 'express-session'

import logger from "./logger.js";

//----------------------------------------------------//
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
//----------------------------------------------------//

import ContenedorUsuarios from "./contenedor/ContenedorUsuarios.js";

const users = new ContenedorUsuarios();
const productos = []

//----------------------------------------------------//

import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//----------------------------------------------------//
passport.use('register', new LocalStrategy({
    passReqToCallback: true
}, async (req, username, password, done) => {
    const { direccion } = req.body

    const usuario = await users.getUser(username)
    if (usuario) {
        return done('el usuario ya esta registrado')
    }

    const newUser = {
        nombre: username,
        correo: direccion,
        password: password
    }

    console.log(newUser);

    await users.save(newUser)

    done(null, newUser)
}))

passport.use('login', new LocalStrategy(async (username, password, done) => {

    const usuario = await users.getUser(username)
    if (usuario) {
        return done('no hay usuario', false)
    }

    if (usuario.password != password) {
        return done('pass incorrecta', false)
    }

    return done(null, usuario)
}))

passport.serializeUser((user, done) => {
    done(null, user.nombre)
})

passport.deserializeUser(async (username, done) => {
    const usuario = await users.getUser(username)
    done(null, usuario)
})

//----------------------------------------------------//

const app = express()

app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60000
    }
}))

//----------------------------------------------------//
app.use(passport.initialize())
app.use(passport.session())
//----------------------------------------------------//

app.set('view engine', '.ejs')

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//-------------------//
// Rutas de registro //
//-------------------//

app.get('/register', (req, res) => {
    res.sendFile(__dirname + '/views/register.html')
})

app.post('/register', passport.authenticate('register', { failureRedirect: '/failregister', successRedirect: '/' }))

app.get('/failregister', (req, res) => {
    res.render('register-error')
})

//----------------//
// Rutas de login //
//----------------//

app.get('/login', (req, res) => {
    if (req.isAuthenticated()) {
        res.redirect('/index')
    }

    res.sendFile(__dirname + '/views/login.html')
})

app.post('/login', passport.authenticate('login', { failureRedirect: '/faillogin', successRedirect: '/index' }))

app.get('/faillogin', (req, res) => {
    res.render('login-error')
})

//----------------//
// Rutas de datos //
//----------------//

function requireAuthentication(req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}

app.get('/index', requireAuthentication, async (req, res) => {

    const usuario = await users.getUser(req.user.nombre)

    res.render('index', {
        datos: usuario,
        productos: productos
    })
})

//----------------//
// Ruta de logout //
//----------------//

app.get('/logout', (req, res) => {
    req.logout(err => {
        res.redirect('/login')
    })
})

//-----------//
// Ruta raiz //
//-----------//

app.get('/', (req, res) => {
    res.redirect('/index')
})

//---------------------//
// Ruta calculaRandom //
//-------------------//

app.get('/api/random-deb?:cant', (req, res) => {

    function calculo(cant) {
        for (let i = 0; i < cant; i++) {
            console.log(Math.round(Math.random() * 1000));
        }
    }

    const cant = req.query.cant

    if (isNaN(cant)) {
        calculo(100000)
    } else {
        calculo(cant)
    }

    res.json({ Listo: 'Ok' })
})

app.get('/api/random?:cant', (req, res) => {

    const randoms = new Array

    function calculo(cant) {
        for (let i = 0; i < cant; i++) {
            randoms.push(Math.round(Math.random() * 1000))
        }
    }

    const cant = req.query.cant

    if (isNaN(cant)) {
        calculo(100000)
    } else {
        calculo(cant)
    }

    res.json(randoms)

})

//-----------------//
// Uso de Cluster //
//---------------//

import os from "os";

const numCPUs = os.cpus().length

//------------//
// Ruta info //
//----------//

app.get('/info', (req, res) => {

    const info = {
        Argumentos: process.argv.slice(2),
        SO: process.platform,
        Version: process.version,
        PID: process.pid,
        Path: process.execPath,
        Ejecucion: process.cwd(),
        Memoria: process.memoryUsage(),

        Procesadores: numCPUs

    }

    //Prueba de error por logger

    logger.info('Todo Ok')

    const informacion = JSON.stringify(info)

    res.json(informacion.repeat(50))

})

//-------------------//
// Ruta Compression //
//-----------------//

import compression from "compression";

app.get('/info-gzip', compression(), (req, res) => {

    const info = {
        Argumentos: process.argv.slice(2),
        SO: process.platform,
        Version: process.version,
        PID: process.pid,
        Path: process.execPath,
        Ejecucion: process.cwd(),
        Memoria: process.memoryUsage(),

        Procesadores: numCPUs

    }

    logger.info('Todo Ok')

    const informacion = JSON.stringify(info)

    res.json(informacion.repeat(50))

})

app.get('*', (req, res) => {
    const { url, method } = req
    logger.warn("Ruta no implementada.")
    res.send("Ruta no implementada.")
})

//------------------------//
// Argumentos x Minimist //
//----------------------//

import parseArgs from 'minimist'

const config = {
    alias: {
        p: 'PORT',
    },
    default: {
        PORT: 8080,
    }
}

const { PORT } = parseArgs(process.argv.slice(2), config)

app.listen(PORT, (err) => {

    if (err) {
        logger.error('Error al iniciar el servidor')
    }
    logger.info('Servidor corriendo ...')
    app.get('/*', (req, res) =>{
        res.redirect('/login')
    })
})