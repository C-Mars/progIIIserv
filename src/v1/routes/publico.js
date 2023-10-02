
const { Router } = require('express');

const {enviarCorreo} = require('../../controllers/publico')
// intanciar el router de express
const router = Router(); 
// Defino las rutas
router.post('/contacto',enviarCorreo);

module.exports = router;