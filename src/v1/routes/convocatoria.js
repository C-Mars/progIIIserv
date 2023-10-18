const { Router } = require('express');
const router = Router(); 

const {buscarTodosConvocatoria,crearConvocatoria, buscarPorIdConvocaroria} = require('../../controllers/convocatoria')
//Buscar convocatorias

router.get('/convocatorias', buscarTodosConvocatoria)


//buscarPorID
router.get('/convocatorias/:idConvocatoria', buscarPorIdConvocaroria);

//agregar convocatoria

router.post('/nueva',crearConvocatoria);
//Editar
router.put('/editar/:idConvocatoria', modificar)



module.exports = router;
