const conexion = require('./conexionBD');

const buscarRivalPorId = async (idRival) => {

    const consulta = `SELECT  idRival, nombre FROM rival WHERE activo = 1 AND idRival = ?`;

    const [rival] = await conexion.query(consulta,idRival);    

    return rival;
}


const buscarRivalTodos = async () => {

    const consulta = `SELECT idRival, nombre FROM rival WHERE activo = 1`;

    const [rivales] = await conexion.query(consulta);    

    return rivales;
}

module.exports = {
    buscarRivalPorId,
    buscarRivalTodos,
}
