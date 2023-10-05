const convocatoriaBD = require('../database/convocatoriaBD')



exports.buscarTodosConvocatoria = async(req, res) => {
    try{
        const convocatorias = await convocatoriaBD.buscarTodos();

        res.json({estado:'OK', dato:convocatorias});

    }catch (exec){
        throw exec;
    };

};


   