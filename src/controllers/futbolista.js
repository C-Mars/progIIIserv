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
    const idFutbolista = req.params.idFutbolista;
    try {
        if (!idFutbolista) {
            res.status(404).json({ estado: 'FALLO', msj: 'Falta el id' });
        } else {const futbolista = await futbolistaBD.buscarPorId(idFutbolista);
            res.json({ estado: 'OK', dato: futbolista });
        }

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
    const { dni, nombre, apellido, posicion, apodo, foto, piehabil } = req.body;

    if (!dni || !nombre || !apellido || !posicion || !apodo || !foto || !piehabil) {
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
    const { dni, nombre, posicion, apodo, foto, piehabil } = req.body;
  
    if (!dni ||!nombre || !posicion || !apodo || !foto || !piehabil) {
      return res.status(400).json({ estado: 'FALLO', msj: 'Todos los campos son obligatorios' });
    }
  
    try {
      const futbolistaActualizado = await futbolistaBD.editarPorId(idFutbolista, {
        dni,
        nombre,
        posicion,
        apodo,
        foto,
        piehabil
      });
  
      if (futbolistaActualizado) {
        res.status(200).json({ estado: 'OK', msj: 'Futbolista actualizado', dato: futbolistaActualizado });
      } else {
        res.status(404).json({ estado: 'FALLO', msj: 'Futbolista no encontrado' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ estado: 'FALLO', msj: 'Error al actualizar el futbolista' });
    }
  };
// exports.editarFutbolista = async (req, res) => {
//     const { dni, nombre, apellido, posicion, apodo, piehabil } = req.body;

//     if (!dni || !nombre || !apellido || !posicion || !apodo || !piehabil) {
//         return res.status(404).json({ estado: 'FALLO', msj: 'No existe Ningún futbolista en la base de datos' });
//     } else {
//         const futbolistapor = await futbolistaBD.buscarPor(dni, nombre, apellido, posicion, apodo, foto, piehabil)
        
//         const futbolista = {
//             dni,
//             nombre,
//             apellido,
//             posicion,
//             apodo,
//             foto,
//             piehabil,
//             activo,
//         };

//         try {
//             const futbolistaNuevo = await futbolistaBD.crear(futbolista);
//             res.status(201).json({ estado: 'OK', msj: 'Futbolista creado', dato: futbolistaNuevo });
//         } catch (error) {
//             console.error(error);
//             res.status(500).json({ estado: 'FALLO', msj: 'Error al crear el futbolista' });
//         }
//     }
// };





