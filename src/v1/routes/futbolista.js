
const { Router } = require('express');
const router = Router(); 
const { buscarFutbolista, eliminarFutbolista, buscarPorIdFutbolista,crearFutbolista,editarFutbolistaId,buscarPorApellido} = require('../../controllers/futbolista');




//Buscar Futbolista  
router.get('/futbolistas', buscarFutbolista);
//Buscar Futbolista  Por ID
router.get('/futbolistas/:idFutbolista', buscarPorIdFutbolista)
 
//busqueda por Apellido
router.get('/apellido/:apellido', buscarPorApellido)

//Agregar  Futbolista

router.post('/futbolistas', crearFutbolista)

//eliminar Futbolista
router.delete('/futbolistas/:idFutbolista', eliminarFutbolista)

//Modificar Futbolista ID
router.put('/futbolistas/:idFutbolista', editarFutbolistaId);



module.exports = router;


