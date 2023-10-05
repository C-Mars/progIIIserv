const convocatoriaBD = require('../database/convocatoriaBD')



exports.buscarTodosConvocatoria = async(req, res) => {
    try{
        const convocatorias = await convocatoriaBD.buscarTodos();

        res.json({estado:'OK', dato:convocatorias});

    }catch (exec){
        throw exec;
    };

};

exports.buscarPorIdConvocaroria = async(req, res) => {
    try{
        const idConvocatoria = req.params.idConvocatoria;   
        
        if(!idConvocatoria) {
            res.status(404).json({estado:'FALLO', msj:'Falta el id'});
        }

        const convocatoria = await convocatoriaBD.buscarPorId(idConvocatoria);

        res.json({estado:'OK', dato:convocatoria});

    }catch (exec){
        throw exec;
    }
};

exports.crearConvocatoria = async (req, res) => {

    const {fecha, rival, golesrecibidos, golesconvertidos} = req.body;

    if(!fecha || !rival || !golesrecibidos || !golesconvertidos){
        res.status(404).json({estado:'FALLA', msj:'Faltan datos obligatorios'});
    }else{
        const convocatoria = {
            fecha:fecha, 
            //ver como relacionar las tablas
            rival:rival, 
            golesrecibidos:golesrecibidos, 
            golesconvertidos:golesconvertidos, 
        }; 


        try{
            const convocatoriaNuevo = await convocatoriaBD.crear(convocatoria);
            res.status(201).json({estado:'OK', msj:'Convocatoria creada', dato:convocatoriaNuevo});
        }catch(error) {
            console.error(error);
            res.status(500).json({ estado: 'FALLO', msj: 'Error al crear una nueva convocatoria' });
        }
    }
};

   