const Router = require('express');
const router = Router();
const {NuevaConvFutb, FutbolistaConvocatoriaPorIdConvocatoria} = require('../../controllers/futbolistaconvocatoria');




//crear nueva convocatoria de futbolistas para una determinada conv
router.post('/nuevafutbolistaconvocatoria', NuevaConvFutb); 
//Buscar por id
router.get('/futbolistaconvocatoria/:idConvocatoria', FutbolistaConvocatoriaPorIdConvocatoria)

module.exports = router;