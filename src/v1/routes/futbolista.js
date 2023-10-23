
const { Router } = require('express');
const router = Router(); 
const { buscarFutbolista, eliminarFutbolista, buscarPorIdFutbolista,crearFutbolista,editarFutbolistaId,buscarPorApellido} = require('../../controllers/futbolista');




//Buscar Futbolista  
router
    .get('/futbolistas', buscarFutbolista)
//Buscar Futbolista  Por ID
    .get('/futbolistas/:idFutbolista', buscarPorIdFutbolista)
 
//busqueda por apellido
    .get('/apellido', buscarPorApellido)

//agregar  Futbolista

    .post('/futbolistas', crearFutbolista)

//eliminar Futbolista
    .delete('/futbolistas/:idFutbolista', eliminarFutbolista)

//modificar Futbolista ID
    .put('/editar/:idFutbolista', editarFutbolistaId);



module.exports = router;


