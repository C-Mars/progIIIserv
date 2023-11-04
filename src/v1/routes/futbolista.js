
const { Router } = require('express');

const { buscarFutbolista, eliminarFutbolista, buscarPorIdFutbolista,crearFutbolista,editarFutbolistaId,buscarPorApellido} = require('../../controllers/futbolista');
const { upload } = require('../../controllers/subirArchivo');

const router = Router(); 

//Buscar Futbolista  
router.get('/futbolistas', buscarFutbolista);
//Buscar Futbolista  Por ID
router.get('/futbolistas/:idFutbolista', buscarPorIdFutbolista)
 
//busqueda por Apellido
router.get('/apellido/:apellido', buscarPorApellido)

//Agregar  Futbolista

router.post('/futbolistas', upload, crearFutbolista)

//eliminar Futbolista
router.delete('/futbolistas/:idFutbolista', eliminarFutbolista)

//Modificar Futbolista ID
router.put('/futbolistas/:idFutbolista', editarFutbolistaId);



module.exports = router;


