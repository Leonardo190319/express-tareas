require("dotenv").config(); // carga la configuracion de variables de entorno

const { neon } = require("@neondatabase/serverless"); // trae la instancia leon

const express = require('express')// trae instancia de express
const app = express()// configura express
const port = 3000 //define puertp
const sql = neon(process.env.DATABASE_URL); // se crea la conexion xon neon

app.get('/', async (req, res) => {
  const result = await sql`SELECT version()`; // se ejecuta la consulta sql
  const { version } = result[0];// obtengo el resultado
  res.send('Hello World! :: ' + version)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.get('/datos', async (req, res) => {
    try {
      const result = await sql`SELECT * FROM tareas`; // Cambia 'mi_tabla' por el nombre real
      res.json(result);
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).json({ error: 'Error en el servidor' });
    }
  })