// módulo
const express = require('express');

//utilizar ap entorno y agrego un archivo .env
require('dotenv').config();


const morgan = require('morgan');


// utilizar el módulo cors
const cors = require('cors');

//  aplicación utilice el módulo express 
const app = express();

//  aplicación utilice el módulo express 
app.use(cors());

// para que los datos que ingresen sean en formato json.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

 // definir un rutas
app.get('/', (req,res)=>{
    // console.log('GET funciona')
    const saludo = 'Hola salió';
    res.status(200).json({saludo});
});
// Rutas del API
const v1Publico = require('./src/v1/routes/publico');
// middleeare api (use las rutas definidas)
app.use('/api/src/v1/publico', v1Publico);



/*listen recibe dos los parámetros: 1- puerto en donde el servidor se encarga de 
atender, 2-f de callback (utilizo un console para saber si funciona)*/ 
app.listen(process.env.PUERTO,()=>{
       console.log('API Campus AFA iniciada'); 
});