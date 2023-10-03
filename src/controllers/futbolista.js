const futbolistaBD = require('../database/futbolistaBD')

exports.buscarFutbolista = async(req, res) => {
    try{ 
        
        const futbolistas = await futbolistaBD.buscarFutbolista();

        res.json({estado:'OK', dato:futbolistas});
        
        if(!futbolistas) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
    }catch (exec){
        throw exec;
    }
}



