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

        } else {
            const futbolista = await futbolistaBD.buscarPorId(idFutbolista);
            res.json({ estado: 'OK', dato: futbolista });
        }

    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLO', msj: 'Error al buscar el futbolista por ID' });
    }
};

exports.buscarPorApellido = async (req, res) => {
    try {
        const apellidoABuscar = req.params.apellido; // Cambia req.query a req.params

        if (!apellidoABuscar) {
            return res.status(400).json({ estado: 'FALLO', msj: 'Debes proporcionar un apellido para la búsqueda' });
        }

        const futbolistas = await futbolistaBD.buscarPorApellido(apellidoABuscar);

        if (futbolistas.length === 0) {
            return res.status(404).json({ estado: 'FALLO', msj: 'No se encontraron futbolistas con ese apellido' });
        }

        res.json({ estado: 'OK', datos: futbolistas });
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLO', msj: 'Error al buscar futbolistas' });
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
    const { dni, nombre, apellido, posicion, apodo, pieHabil, foto } = req.body;

    if (!dni || !nombre || !apellido || !posicion || !apodo || !pieHabil) {
        return res.status(404).json({ estado: 'FALLO', msj: 'Todos los campos son obligatorios' });
    } else {

        const futbolista = {
            dni: dni,
            nombre: nombre,
            apellido: apellido,
            posicion: posicion,
            apodo: apodo,
            pieHabil: pieHabil,
            foto: foto
           
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

// Editar un futbolista por ID
exports.editarFutbolistaId = async (req, res) => {
    const { idFutbolista } = req.params;
    const { dni, nombre, apellido, posicion, apodo, foto, pieHabil } = req.body;

    if (!dni || !nombre || !apellido || !posicion || !apodo || !pieHabil) {
        return res.status(400).json({ estado: 'FALLO', msj: 'Todos los campos son obligatorios' });
    }

    try {
        const futbolista = {
            dni,
            nombre,
            apellido,
            posicion,
            apodo,
            foto,
            pieHabil
        };
        const futbolistaActualizado = await futbolistaBD.editarPorId(futbolista, idFutbolista)
        if (futbolistaActualizado) {

            res.status(200).json({ estado: 'OK', msj: 'Futbolista actualizado', dato: futbolistaActualizado });

        } else {

            res.status(404).json({ estado: 'FALLO', msj: 'Futbolista no encontrado' });

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ estado: 'FALLO', msj: 'Error al actualizar el futbolista' });
    }
};


