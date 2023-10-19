const futbolistasConvocatoriaBD = require('../database/futbolistaconvocatoriaBD');


const NuevaConvFutb  = async (req, res) => {
    const {idConvocatoria, futbolistas} = req.body;
    try{
        const nuevaLista = await futbolistasConvocatoriaBD.nueva(idConvocatoria,futbolistas);
        res.status(201).json({estado:'OK', msj:'Convocatoria Realizada!'});
        
    }catch (exec){
        throw exec;
    }
}

const FutbolistaConvocatoriaPorIdConvocatoria = async (req, res) => {
    const {idConvocatoria} = req.params;

    try{
        const convocados = await futbolistasConvocatoriaBD.FutbolistaConvocatoriaPorIdConvocatoria(idConvocatoria);
        res.status(201).json({estado:'OK', dato:convocados});
    }catch (exec){
        throw exec;
    }

}

module.exports={
    NuevaConvFutb,
    FutbolistaConvocatoriaPorIdConvocatoria
}
