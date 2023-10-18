const rivalBD = require('../database/rivalBD');

// retorna el rival, segun el idRival que recibe
const buscarRivalPorId = async(req, res) => {
    try{
        const idRival = req.params.idRival;   
        
        if(!idRival) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id del rival que quiere buscar'});
        }

        const rival = await rivalBD.buscarRivalPorId(idRival);

        res.json({estado:'OK', dato:rival});

    }catch (exec){
        throw exec;
    }
}

// retorna todos los rivales activos
const buscarRivalTodos = async(req, res) => {
    try{
        const rivales = await rivalBD.buscarRivalTodos();
        res.json({estado:'OK', dato:rivales});
    }catch (exec){
        throw exec;
    }
}

module.exports = {
    buscarRivalPorId,
    buscarRivalTodos,
}