const conexion = require('./conexionBD');




const buscarTodos = async () => {

    const consulta = `SELECT fecha, nombre, rival, golesrecibidos, golesconvertidos 
    FROM convocatoria INNER JOIN rival 
    ON convocatoria.rival= rival.idRival`;

    const [convocatorias] = await conexion.query(consulta);    

    return convocatorias;
};

const buscarPorId = async (idConvocatoria) => {

    const consulta = `SELECT fecha, nombre, rival, golesrecibidos, golesconvertidos 
    FROM convocatoria INNER JOIN rival 
    ON convocatoria.rival= rival.idRival
    AND idConvocatoria = ?` ;

    const [convocatoria] = await conexion.query(consulta, idConvocatoria);    

    return convocatoria;
};

const crear = async (convocatoria) => {


    const consulta = 'INSERT INTO convocatoria SET ?';
    const [convocatoriaNuevo] = await conexion.query(consulta, convocatoria);

    // console.log(convocatoriaNuevo.insertId);

    return buscarPorId(convocatoriaNuevo.insertId);
};



module.exports = {
    buscarTodos,
    buscarPorId,
    crear
};