const convocatoriaBD = require('../database/convocatoriaBD')



exports.buscarTodosConvocatoria = async (req, res) => {
    try {
        const convocatorias = await convocatoriaBD.buscarTodosConvocaroria();

        res.status(200).json({ estado: 'OK', dato: convocatorias });

    } catch (exec) {
        throw exec;
    };

};

exports.buscarPorIdConvocaroria = async (req, res) => {

    const idConvocatoria = req.params.idConvocatoria;

    if (!idConvocatoria) {
        res.status(404).json({ estado: 'FALLO', msj: 'No se modifico' });
    } else {
        try {

            const convocatoria = await convocatoriaBD.buscarConvocatoriaPorId(idConvocatoria);

            res.status(200).json({ estado: 'OK', dato: convocatoria });

        } catch (exec) {
            throw exec;
        }
    }
}
    exports.crearConvocatoria = async (req, res) => {

        const { fecha, rival, golesrecibidos, golesconvertidos } = req.body;

        if (!fecha || !rival) {
            res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
        } else {
            const convocatoria = {
                fecha: fecha,
                rival: rival,
                golesrecibidos: golesrecibidos,
                golesconvertidos: golesconvertidos,
            };


            try {
                const convocatoriaNuevo = await convocatoriaBD.crearConvocatoria(convocatoria);
                res.status(201).json({ estado: 'OK', msj: 'Convocatoria creada', dato: convocatoriaNuevo });
            } catch (error) {
                console.error(error);
                res.status(500).json({ estado: 'FALLO', msj: 'Error al crear una nueva convocatoria' });
            }
        }
    };

    exports.editarConvocatoria = async (req, res) => {
        const { fecha, rival } = req.body;
        const idConvocatoria = req.params.idConvocatoria;


        if (!idConvocatoria) {
            res.status(404).json({ estado: 'FALLO', msj: 'Faltan datos requeridos' });
        } else {
            const dato = {
               fecha: fecha,
                rival: rival
            }

            const convocatoriaModificada = await convocatoriaBD.editarConvocatoria(dato, idConvocatoria);
            res.status(200).json({ estado: 'OK', msj: 'Convocatoria modficada', dato: convocatoriaModificada });
        }
    } 
    
    exports.editarConvocatoriaResultados = async (req, res) => {
        const { golesConvertidos, golesRecibidos } = req.body;
        
        const { idConvocatoria } = req.params;


        if (!idConvocatoria) {
            res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
        } else {
            const dato = {
                golesConvertidos: golesConvertidos,
                golesRecibidos: golesRecibidos
            }

            const convocatoriaModificada = await convocatoriaBD.editarConvocatoria(dato, idConvocatoria);
            res.status(200).json({ estado: 'OK', msj: 'Convocatoria modficada', dato: convocatoriaModificada });
        }
    } 

    exports.eliminarConvocatoria = async (req, res) => {
        const idConvocatoria = req.params.idConvocatoria;
    
        if (!idConvocatoria) {
            res.status(404).json({ estado: 'FALLO', msj: 'no se especifico el id del Convocatoria' });
        } else {
            try {
                await convocatoriaBD.eliminarConvocatoria(idConvocatoria);
                res.status(200).json({ estado: 'OK', msj: 'Convocatoria eliminada' });
            } catch (error) {
                throw exec;
            }
        }
    };