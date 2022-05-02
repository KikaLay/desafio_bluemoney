const { exec } = require('child_process')
const argumentos = process.argv.slice(2)
const nombre_archivo = argumentos[0]
const extension_archivo = argumentos[1]
const indicador_economico = argumentos[2]
const cantidad = Number.parseFloat(argumentos[3])
exec(
  `node api.js ${nombre_archivo} ${extension_archivo} ${indicador_economico} ${cantidad}`,
  (error, stdout, stderr) => {
    if (error) {
      console.error(`exec error: ${error}`)
      return
    }
    console.log(`Mensaje: ${stdout}`)
  }
)