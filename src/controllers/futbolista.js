const futbolistaBD = require('../database/futbolistaBD')

exports.buscarFutbolista = async (req, res) => {
    try {

        const futbolistas = await futbolistaBD.buscarTodos();

        res.json({ estado: 'OK', dato: futbolistas });

        if (!futbolistas) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }
    } catch (exec) {
        throw exec;
    }
};

exports.buscarPorIdFutbolista = async (req, res) => {
    try {
        const idFutbolista = req.params.idFutbolista;

        if (!idFutbolista) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        }

        const futbolista = await futbolistaBD.buscarPorId(idFutbolista);

        res.json({ estado: 'OK', dato: futbolista });

    } catch (exec) {
        throw exec;
    }
};


exports.eliminarFutbolista = async (req, res) => {
    const idFutbolista = req.params.idFutbolista;

    if (!idFutbolista) {
        res.status(404).json({ estado: 'FALLO', msj: 'no se especifico el id del Futbolista' });
    } else {
        try {
            await futbolistaBD.eliminar(idFutbolista);
            res.status(200).json({ estado: 'OK', msj: 'Futbolista eliminado' });
        } catch (error) {
            throw exec;
        }
    }
};

exports.crearFutbolista = async (req, res) => {
    const { dni, nombre, apellido, posicion, apodo, foto, piehabil, activo } = req.body;

    if (!dni || !nombre || !apellido || !posicion || !apodo || !foto || !piehabil || activo === undefined) {
        return res.status(404).json({ estado: 'FALLO', msj: 'Todos los campos son obligatorios' });
    } else {

        const futbolista = {
            dni,
            nombre,
            apellido,
            posicion,
            apodo,
            foto,
            piehabil,
            activo,
        };

        try {
            const futbolistaNuevo = await futbolistaBD.crear(futbolista);
            res.status(201).json({ estado: 'OK', msj: 'Futbolista creado', dato: futbolistaNuevo });
        } catch (error) {
            console.error(error);
            res.status(500).json({ estado: 'FALLO', msj: 'Error al crear el futbolista' });
        }
    }
};





