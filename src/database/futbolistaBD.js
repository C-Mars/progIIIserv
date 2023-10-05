const conexion = require('./conexionBD');

const buscarTodos = async () => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensor'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        ELSE ''
    END)
    AS posicion, apodo, foto, 
    (CASE
        WHEN piehabil = 0 THEN 'derecho'
        WHEN piehabil = 1 THEN 'izquierdo'
        ELSE ''
    END)
    As piehabil 
    FROM futbolista 
    WHERE activo = 1` ;

    const [futbolistas] = await conexion.query(consulta);    

    return futbolistas;
}

const buscarPorId = async (idFutbolista) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensor'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        ELSE ''
    END)
    AS posicion, apodo, foto, 
    (CASE
        WHEN piehabil = 0 THEN 'derecho'
        WHEN piehabil = 1 THEN 'izquierdo'
        ELSE ''
    END)
    As piehabil 
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?` ;

    const [futbolista] = await conexion.query(consulta, idFutbolista);    

    return futbolista;
}

const buscarPor = async (busqueda) => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensor'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        ELSE ''
    END)
    AS posicion, apodo, foto, 
    (CASE
        WHEN piehabil = 0 THEN 'derecho'
        WHEN piehabil = 1 THEN 'izquierdo'
        ELSE ''
    END)
    As piehabil 
    FROM futbolista 
    WHERE
        dni LIKE ? OR
        nombre LIKE ? OR
        apellido LIKE ? OR
        posicionLIKE ? OR
        apodo LIKE ? OR
        piehabil LIKE ? OR
        activo = 1` ;

    const [futbolistas] = await conexion.query(consulta,[`%${busqueda}%`,`%${busqueda}%`,`%${busqueda}%`,`%${busqueda}%`,`%${busqueda}%`,`%${busqueda}%`,`%${busqueda}%`]);    

    return futbolistas;
}


const eliminar = async (idFutbolista) => {
    const consulta = 'UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?';
    await conexion.query(consulta, [idFutbolista]);    
}

const crear = async (futbolista) => {


    const consulta = 'INSERT INTO futbolista SET ?';
    const [futbolistaNuevo] = await conexion.query(consulta, futbolista);

    // console.log(futbolistaNuevo.insertId);

    return buscarPorId(futbolistaNuevo.insertId);
};

const editar = async (idFutbolista) => {
    const consulta = 'UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?';
    await conexion.query(consulta, [idFutbolista]);    
}
// Editar un futbolista por ID
const editarPorId = async (id, nuevosDatos) => {
  const consulta = 'UPDATE futbolista SET ? WHERE idFutbolista = ?';
  const [resultado] = await conexion.query(consulta, [nuevosDatos, id]);

  if (resultado.affectedRows > 0) {
    return buscarPorId(id);
  } else {
    return null; // Futbolista no encontrado
  }
};


module.exports ={
    buscarTodos,
    eliminar,
    buscarPorId,
    crear,
    editar,
    buscarPor,
    editarPorId
}