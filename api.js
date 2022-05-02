// recibiendo argumentos
const argumentos = process.argv.slice(2)
const nombre_archivo = argumentos[0]
const extension_archivo = argumentos[1]
const indicador_economico = argumentos[2]
const cantidad = Number.parseFloat(argumentos[3])
// fin recibir argumentos
//Lamada a los modulos https , fs
const https = require('https')
const fs = require('fs')
https
  .get(`https://mindicador.cl/api`, (resp) => {
    let data = ''
    resp.on('data', (chunk) => {
      data += chunk
    })
    resp.on('end', () => {
      const body = JSON.parse(data)
      const fecha = body[indicador_economico].fecha
      const mivalor = body[indicador_economico].valor
      const total_convertido = (cantidad / mivalor).toFixed(2)
      const mensaje = `A la fecha: ${fecha} La cotizacion fue realizada con los siguientes datos:
Cantidad de pesos a convertir: ${cantidad} pesos Convertido a "${indicador_economico}" da un total de: $${total_convertido}`
      //Creacion de archivo
      fs.writeFile(`${nombre_archivo}.${extension_archivo}`, mensaje, () => {
        console.log(mensaje)
      })
      // Fin Creacion de archivo
    })
  })
  .on('error', (err) => {
    console.log('Error: ' + err.message)
  })