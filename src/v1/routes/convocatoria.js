const { Router } = require('express');
const router = Router(); 

const {buscarTodosConvocatoria,crearConvocatoria, buscarPorIdConvocaroria,editarConvocatoria,eliminarConvocatoria} = require('../../controllers/convocatoria');

//Buscar convocatorias

router.get('/convocatorias', buscarTodosConvocatoria)


//buscarPorID
router.get('/convocatorias/:idConvocatoria', buscarPorIdConvocaroria);

//agregar convocatoria

router.post('/nuevaconvocatoria',crearConvocatoria);
//Editar
router.put('/convocatorias/:idConvocatoria', editarConvocatoria)
//Eliminar Convocaroria
router.delete('/convocatorias/:idConvocatoria',eliminarConvocatoria)



module.exports = router;
