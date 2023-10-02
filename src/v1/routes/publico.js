const { Router } = require('express');

const {enviarCorreo} = require('../../controllers/publico.js')
const router = Router(); 

router.post('/contacto',enviarCorreo);
module.exports = router;