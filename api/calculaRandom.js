function calculo(cant) {
    for (let i= 0; i < cant; i++) {
        console.log(Math.round(Math.random()*1000));
    }
}

process.on('exit', () => {
    console.log(`Proceso ${process.pid} terminado.`)
})

process.on('message', cant => {
    console.log(`Proceso ${process.pid} iniciado.`);
    calculo(cant)
    process.exit()
})

process.send('end')