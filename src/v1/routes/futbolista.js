const { Router } = require('express');

const { buscarFutbolista} = require('../../controllers/futbolista');


const router = Router(); 

//buscarFutbolista  Activos
router.get('/futbolistas', buscarFutbolista);

//agregar

//eliminar

//modificar


module.exports = router;