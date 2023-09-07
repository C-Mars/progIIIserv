// módulo
const express = require('express');
//  aplicación express
const app = express();
// definir un rutas

app.get('/', (req,res)=>{
    // console.log('GET funciona')
    const saludo = 'Hola salió';
    res.status(200).json({saludo});
});
/*listen recibe dos los parámetros: 1- puerto en donde el servidor se encarga de 
atender, 2-f de callback (utilizo un console para saber si funciona)*/ 
app.listen(3005,()=>{
       console.log('API Campus AFA iniciada'); 
});