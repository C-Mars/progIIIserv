const conexion = require('./conexionBD');




const buscarTodos = async () => {

    const consulta = `SELECT fecha, nombre, rival, golesrecibidos, golesconvertidos 
    FROM convocatoria INNER JOIN rival 
    ON convocatoria.rival= rival.idRival`;

    const [convocatorias] = await conexion.query(consulta);    

    return convocatorias;
}

module.exports = {
    buscarTodos
}