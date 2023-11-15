// módulo
const express = require('express');

//utilizar ap entorno y agrego un archivo .env
require('dotenv').config();


const morgan = require('morgan');

//para trabajar con el sistema de archivos: crear leer etc archivos

const fs = require('fs');

// trabajar con las rutas de archivos y directorios del sistema de archivos

const path = require('path');



// utilizar el módulo cors
const cors = require('cors');

//  aplicación utilice el módulo express 
const app = express();

//  aplicación utilice el módulo express 
app.use(cors());

const passport = require("passport");
require('./src/config/passport');
// para que los datos que ingresen sean en formato json.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CREA UN ARCHIVO DE ACCESO
// create a write stream (in append mode)
// console.log(__dirname);
var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })
// setup the logger
app.use(morgan('combined', { stream: accessLogStream }))

app.get('/', (req, res)=>{
    const saludo = {estado:true, mensaje:'bienvenido!'}
    res.status(200).json(saludo);
});




// Rutas del API
const v1Publico = require('./src/v1/routes/publico');
const v1Auth = require('./src/v1/routes/auth');
const v1Futbolista = require('./src/v1/routes/futbolista');
const v1Rival = require('./src/v1/routes/rival')
const v1Convocatoria = require('./src/v1/routes/convocatoria')
const v1FutbolistaConvocatoria = require('./src/v1/routes/futbolistaconvocatoria');
const v1Estadistica = require('./src/v1/routes/estadistica');


app.get('/archivos/:nombreArchivo', (req, res) => {
       const nombreArchivo = req.params.nombreArchivo;
       const rutaArchivo = path.join(__dirname, 'src', 'archivos', nombreArchivo);
   
       if (fs.existsSync(rutaArchivo)) {
           res.sendFile(rutaArchivo);
       } else {
           res.status(404).json({ estado: 'FALLO', msj: 'Archivo no encontrado' });
       }
   });
   
   const { esEntrenador } = require('./src/middlewares/esEntrenador');
   const { esPresidente } = require('./src/middlewares/esPresidente');
   
   
// middleeare api (use las rutas definidas)
app.use('/api/v1/auth', v1Auth);
app.use('/api/v1/publico', v1Publico);
app.use('/api/v1/futbolista',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Futbolista);
app.use('/api/v1/convocatoria',[passport.authenticate('jwt', {session: false}), esEntrenador], v1Convocatoria);
app.use('/api/v1/rival', v1Rival);
app.use('/api/v1/futbolistaconvocatoria', v1FutbolistaConvocatoria);
app.use('/api/v1/estadistica', [passport.authenticate('jwt', {session: false}), esPresidente], v1Estadistica);

// Middleware para verificar el token JWT en las rutas protegidas
const verificarTokenJWT = passport.authenticate('jwt', { session: false });


/*listen recibe dos los parámetros: 1- puerto en donde el servidor se encarga de 
atender, 2-f de callback (utilizo un console para saber si funciona)*/
app.listen(process.env.PUERTO, () => {
       console.log('API Campus AFA iniciada');
}); 