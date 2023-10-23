const conexion = require('./conexionBD');

const buscarTodos = async () => {

    const consulta = `SELECT idFutbolista, dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'Arquero'
        WHEN posicion = 1 THEN 'Defensor'
        WHEN posicion = 2 THEN 'Mediocampista'
        WHEN posicion = 3 THEN 'Delantero'
        ELSE ''
    END)
    AS posicion, apodo, foto,  
    (CASE
        WHEN pieHabil = 0 THEN 'Derecho'
        WHEN pieHabil = 1 THEN 'Izquierdo'
        ELSE ''
    END)
    As pieHabil, false As seleccionado 
    FROM futbolista 
    WHERE activo = 1` ;

    const [futbolistas] = await conexion.query(consulta);    

    return futbolistas;
}

const buscarPorId = async (idFutbolista) => {

    const consulta = `SELECT   idFutbolista,dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'Arquero'
        WHEN posicion = 1 THEN 'Defensor'
        WHEN posicion = 2 THEN 'Mediocampista'
        WHEN posicion = 3 THEN 'Delantero'
        ELSE ''
    END)
    AS posicion, apodo, foto, 
    (CASE
        WHEN pieHabil = 0 THEN 'Derecho'
        WHEN pieHabil = 1 THEN 'Izquierdo'
        ELSE ''
    END)
    As pieHabil , false As seleccionado 
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?` ;

    const [futbolista] = await conexion.query(consulta, idFutbolista);    

    return futbolista;
}

const buscarPorApellido = async (apellido) => {
    try {
        const consulta = `
            SELECT dni, nombre, apellido,
            (CASE
                WHEN posicion = 0 THEN 'arquero'
                WHEN posicion = 1 THEN 'defensor'
                WHEN posicion = 2 THEN 'mediocampista'
                WHEN posicion = 3 THEN 'delantero'
                ELSE ''
            END) AS posicion, apodo, foto,
            (CASE
                WHEN pieHabil = 0 THEN 'derecho'
                WHEN pieHabil = 1 THEN 'izquierdo'
                ELSE ''
            END) AS pieHabil
            FROM futbolista
            WHERE apellido LIKE ? AND activo = 1`;

        // Verificar que el valor de "apellido" se esté pasando correctamente
        console.log("Apellido a buscar:", apellido);

        const [futbolistas] = await conexion.query(consulta, [`%${apellido}%`]);

        return futbolistas;
    } catch (error) {
        throw error;
    }
}

const eliminar = async (idFutbolista) => {
    const consulta = `UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?`;
    await conexion.query(consulta, [idFutbolista]);    
}

const crear = async (futbolista) => {
    const consulta = `INSERT INTO futbolista SET ?`;
    const [futbolistaNuevo] = await conexion.query(consulta, futbolista);

    // console.log(futbolistaNuevo.insertId);

    return buscarPorId(futbolistaNuevo.insertId);
};

const editar = async (idFutbolista) => {
    const consulta = `UPDATE futbolista SET activo = 1 WHERE idFutbolista = ?`;
    await conexion.query(consulta, [idFutbolista]);    
}
// Editar un futbolista por ID
const editarPorId = async (nuevosDatos,idFutbolista) => {
  const consulta = `UPDATE futbolista SET ? WHERE idFutbolista = ?`;
  const [resultado] = await conexion.query(consulta, [nuevosDatos,idFutbolista]);

  if (resultado.affectedRows > 0) {
    return buscarPorId(idFutbolista);
  } else {
    return null; 
  }
};


module.exports ={
    buscarTodos,
    eliminar,
    buscarPorId,
    buscarPorApellido,
    crear,
    editar,
    editarPorId
}