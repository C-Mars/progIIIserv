const {Router} = require('express');

const { buscarRivalPorId, buscarRivalTodos,eliminarRival, crearRival, modificarRival } = require('../../controllers/rival');


const router = Router();

// solo las rutas que necesitamos segun los requerimientos del integrador
router.get('/rivales', buscarRivalTodos)
router.get('/rivales/:idRival', buscarRivalPorId);


module.exports = router;
