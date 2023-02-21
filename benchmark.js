import autocannon from "autocannon";
import stream from "stream";

function run(url) {
    const buf = []
    const outputStream = new stream.PassThrough()
    const inst = autocannon({
        url,
        connection: 100,
        duration: 20
    })
    autocannon.track(inst, {outputStream})
    outputStream.on('data', data => buf.push(data))
    inst.on('done', () => {
        process.stdout.write(Buffer.concat(buf))
    })
}

console.log("Corriendo el brenchmark ...");

run('http://localhost:8080/api/random?cant=100')
run("http://localhost:8080/api/random-deb?cant=100")