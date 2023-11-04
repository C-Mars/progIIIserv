const { Router } = require('express');
const router = Router(); 

const {buscarTodosConvocatoria,crearConvocatoria, buscarPorIdConvocaroria,editarConvocatoria,eliminarConvocatoria,editarConvocatoriaResultados} = require('../../controllers/convocatoria');

//Buscar convocatorias

router.get('/convocatorias', buscarTodosConvocatoria)


//buscarPorID
router.get('/convocatorias/:idConvocatoria', buscarPorIdConvocaroria);

//agregar convocatoria

router.post('/convocatorias',crearConvocatoria);
//Editar
router.put('/convocatorias/:idConvocatoria', editarConvocatoria)

router.put('/convocatorias/resultados/:idConvocatoria',editarConvocatoriaResultados)
//Eliminar Convocaroria
router.delete('/convocatorias/:idConvocatoria',eliminarConvocatoria)



module.exports = router;
