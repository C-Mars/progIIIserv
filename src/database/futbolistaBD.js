const conexion = require('./conexionBD');

const buscarTodos = async () => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensor'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        ELSE ''
    END) AS posicion 
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
    END) AS posicion 
    FROM futbolista 
    WHERE activo = 1 AND idFutbolista = ?` ;

    const [futbolista] = await conexion.query(consulta, idFutbolista);    

    return futbolista;
}

const eliminar = async (idFutbolista) => {
    const consulta = 'UPDATE futbolista SET activo = 0 WHERE idFutbolista = ?';
    await conexion.query(consulta, [idFutbolista]);    
}

module.exports ={
    buscarTodos,
    eliminar,
    buscarPorId

}