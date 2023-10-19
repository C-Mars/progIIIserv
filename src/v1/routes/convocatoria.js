const { Router } = require('express');
const router = Router(); 

const {buscarTodosConvocatoria,crearConvocatoria, buscarPorIdConvocaroria,editarConvocatoria} = require('../../controllers/convocatoria')
//Buscar convocatorias

router.get('/convocatorias', buscarTodosConvocatoria)


//buscarPorID
router.get('/convocatorias/:idConvocatoria', buscarPorIdConvocaroria);

//agregar convocatoria

router.post('/nuevaconvocatoria',crearConvocatoria);
//Editar
router.put('/editar/:idConvocatoria', editarConvocatoria)



module.exports = router;
