
const { Router } = require('express');
const router = Router(); 
const { buscarFutbolista, eliminarFutbolista, buscarPorIdFutbolista,crearFutbolista,editarFutbolistaId,buscarPorApellido} = require('../../controllers/futbolista');




//Buscar Futbolista  
router.get('/futbolistas', buscarFutbolista);
//Buscar Futbolista  Por ID
router.get('/futbolistas/:idFutbolista', buscarPorIdFutbolista);


//agregar  Futbolista

router.post('/futbolistas', crearFutbolista);

//eliminar Futbolista
router.delete('/futbolistas/:idFutbolista', eliminarFutbolista);

//modificar Futbolista ID
router.put('/futbolistas/:idFutbolista', editarFutbolistaId)

//busqueda por apellido
router.get('/apellido', buscarPorApellido);

module.exports = router;


