const jwt = require('jsonwebtoken');
const passport = require("passport");
require('dotenv').config();

const login = async (req, res) => {
    console.log(req.body);
    passport.authenticate('local', { session: false }, (err, usuario, info) => {
        if (err) {
            return res.status(500).json({ estado: 'FALLO', msj: 'Error en el servidor' });
        }
        if (!usuario) {
            return res.status(400).json({ estado: 'FALLO', msj: 'Credenciales incorrectas' });
        }
        // si existe el usuario, armo el token
        req.login(usuario, { session: false }, (err) => {
            if (err) {
                res.send(err);
            }
            
            const token = jwt.sign(usuario, process.env.JWT_SECRET);
            return res.json({ usuario, token });
          
        });
    })(req, res);
};

module.exports = { login };