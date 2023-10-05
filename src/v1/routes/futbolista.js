
const { Router } = require('express');

const { buscarFutbolista, eliminarFutbolista, buscarPorIdFutbolista,crearFutbolista} = require('../../controllers/futbolista');


const router = Router(); 

//buscarFutbolista  Activos
router.get('/futbolistas', buscarFutbolista);
//buscarPorID
router.get('/futbolistas/:idFutbolista', buscarPorIdFutbolista);

//agregar

router.post('/futbolistas', crearFutbolista);

//eliminar
router.delete('/futbolistas/:idFutbolista', eliminarFutbolista);

//modificar


module.exports = router;


// const { Router } = require('express');
// const { buscarFutbolista } = require('../../controllers/futbolista');
// const { conectarBD } = require('../../database/conexionBD');
// const { insertarFutbolista, eliminarFutbolista, modificarFutbolista } = require('../../database/futbolistaBD');

// const router = Router();

// // Middleware para manejar la conexión a la base de datos
// const conectarDBMiddleware = async (req, res, next) => {
//   try {
//     const conexion = await conectarBD();
//     req.conexion = conexion; // Añade la conexión a la solicitud
//     next();
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error al conectar con la base de datos',
//     });
//   }
// };

// // Buscar futbolistas
// router.get('/futbolistas', buscarFutbolista);

// // Agregar futbolistas
// router.post('/futbolistas', conectarDBMiddleware, async (req, res) => {
//   const { nombre, apellido, edad, equipo } = req.body;
//   const jugador = {
//     nombre,
//     apellido,
//     edad,
//     equipo,
//   };

//   try {
//     await insertarFutbolista(req.conexion, jugador);
//     res.status(201).send({
//       message: 'Jugador agregado correctamente',
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error al agregar el jugador',
//     });
//   } finally {
//     req.conexion.end(); // Cierra la conexión después de usarla
//   }
// });

// // Eliminar futbolistas
// router.delete('/futbolistas/:id', conectarDBMiddleware, async (req, res) => {
//   const id = req.params.id;

//   try {
//     await eliminarFutbolista(req.conexion, id);
//     res.status(200).send({
//       message: 'Jugador eliminado correctamente',
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error al eliminar el jugador',
//     });
//   } finally {
//     req.conexion.end();
//   }
// });

// // Modificar futbolistas
// router.put('/futbolistas/:id', conectarDBMiddleware, async (req, res) => {
//   const id = req.params.id;
//   const { nombre, apellido, edad, equipo } = req.body;
//   const jugador = {
//     id,
//     nombre,
//     apellido,
//     edad,
//     equipo,
//   };

//   try {
//     await modificarFutbolista(req.conexion, jugador);
//     res.status(200).send({
//       message: 'Jugador modificado correctamente',
//     });
//   } catch (error) {
//     res.status(500).send({
//       message: 'Error al modificar el jugador',
//     });
//   } finally {
//     req.conexion.end();
//   }
// });

// module.exports = router;