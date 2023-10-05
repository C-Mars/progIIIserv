const futbolistaBD = require('../database/futbolistaBD')

exports.buscarFutbolista = async(req, res) => {
    try{ 
        
        const futbolistas = await futbolistaBD.buscarTodos();

        res.json({estado:'OK', dato:futbolistas});
        
        if(!futbolistas) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }
    }catch (exec){
        throw exec;
    }
};

exports.buscarPorIdFutbolista = async(req, res) => {
    try{
        const idFutbolista = req.params.idFutbolista;   
        
        if(!idFutbolista) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const futbolista = await futbolistaBD.buscarPorId(idFutbolista);

        res.json({estado:'OK', dato:futbolista});

    }catch (exec){
        throw exec;
    }
};


exports.eliminarFutbolista = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;

    if(!idFutbolista){
        res.status(404).json({estado:'FALLO', msj:'no se especifico el id del Futbolista'});
    }else{
        try{
            await futbolistaBD.eliminar(idFutbolista);
            res.status(200).json({estado:'OK', msj:'Futbolista eliminado'});
        }catch (error){
            throw exec;
        }
    }
};





