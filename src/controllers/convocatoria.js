const convocatoriaBD = require('../database/convocatoriaBD')



exports.buscarTodosConvocatoria = async (req, res) => {
    try {
        const convocatorias = await convocatoriaBD.buscarTodosConvocaroria();

        res.status(200).json({ estado: 'OK', dato: convocatorias });

    } catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'FALLO', msj: 'Error al buscar las convocatorias' });

    }

};

exports.buscarPorIdConvocaroria = async (req, res) => {
    try {
        const idConvocatoria = req.params.idConvocatoria;

        if (!idConvocatoria) {
            res.status(404).json({ estado: 'FALLO', msj: 'No existe la convocatoria' });

        } else {
            const convocatoria = await convocatoriaBD.buscarConvocatoriaPorId(idConvocatoria);
            res.status(200).json({ estado: 'OK', dato: convocatoria });
        };

    } catch (error) {
        console.log(error)
        res.status(500).json({ estado: 'FALLO', msj: 'Error al buscar el Id de la convocatoria' });

    }
}

exports.crearConvocatoria = async (req, res) => {

    const { fecha, rival, golesRecibidos, golesConvertidos } = req.body;
    try {
        if (!fecha || !rival) {
            res.status(404).json({ estado: 'FALLA', msj: 'Faltan datos obligatorios' });
        } else {
            const convocatoria = {
                fecha: fecha,
                rival: rival,
                golesRecibidos: golesRecibidos,
                golesConvertidos: golesConvertidos,
            };

            const convocatoriaNuevo = await convocatoriaBD.crearConvocatoria(convocatoria);
            res.status(201).json({ estado: 'OK', msj: 'Convocatoria creada', dato: convocatoriaNuevo });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLO', msj: 'Error al crear una nueva convocatoria' });
    }
}


exports.editarConvocatoria = async (req, res) => {
    const { fecha, rival } = req.body;
    const idConvocatoria = req.params.idConvocatoria;


    if (!idConvocatoria) {
        res.status(404).json({ estado: 'FALLO', msj: 'Faltan datos requeridos' });
    } else {
        const convocatoria = {
            fecha: fecha,
            rival: rival
        }
        try {
            const convocatoriaModificada = await convocatoriaBD.editarConvocatoria(convocatoria, idConvocatoria);
            res.status(200).json({ estado: 'OK', msj: 'Convocatoria modficada', dato: convocatoriaModificada });
        } catch (error) {
            console.error(error);
            res.status(500).json({ estado: 'FALLO', msj: 'Error al editar la convocatoria seleccionada' });
        }

    }
}

exports.editarConvocatoriaResultados = async (req, res) => {

    const idConvocatoria = req.params.idConvocatoria;
    const { golesConvertidos, golesRecibidos } = req.body;

    if (!idConvocatoria) {
        res.status(404).json({ estado: 'FALLO', msj: 'faltan datos requeridos' });
    } else {
        const convocatoria = {
            golesRecibidos: golesRecibidos,
            golesConvertidos: golesConvertidos
        }
        try {
            const convocatoriaModificada = await convocatoriaBD.editarResultados(convocatoria, idConvocatoria);
            res.status(200).json({ estado: 'OK', msj: 'Convocatoria modficada', dato: convocatoriaModificada });
        }
     catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLO', msj: error });
    }
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