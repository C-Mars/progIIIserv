const { Router } = require('express');
const router = Router(); 

const {buscarTodosConvocatoria} = require('../../controllers/convocatoria')
//Buscar convocatorias

router.get('/convocatorias', buscarTodosConvocatoria)

module.exports = router;
