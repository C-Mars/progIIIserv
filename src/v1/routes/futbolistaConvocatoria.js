const Router = require('express');

const {nuevaConvFut, FutbolistaConvocatoriaPorIdConvocatoria} = require('../../controllers/futbolistaConvocatoria');


const router = Router();

//crear nueva convocatoria de futbolistas para una determinada conv
router.post('/nuevaconvocatoriafutbolista', nuevaConvFut)    
//Buscar por id
router.get('/futbolistaConvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)

module.exports = router;