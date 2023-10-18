const conexion = require('./conexionBD');




const buscarConvocaroriaTodos = async () => {

    const consulta = `SELECT fecha, nombre, rival, golesrecibidos, golesconvertidos 
    FROM convocatoria INNER JOIN rival As r
    ON convocatoria.rival= rival.idRival`;

    const [convocatorias] = await conexion.query(consulta);

    return convocatorias;
};

const buscarConvocatoriaPorId = async (idConvocatoria) => {

    const consulta = `SELECT fecha, nombre, rival, golesrecibidos, golesconvertidos 
    FROM convocatoria INNER JOIN rival 
    ON convocatoria.rival= rival.idRival
    AND idConvocatoria = ?` ;

    const [convocatoria] = await conexion.query(consulta, idConvocatoria);

    return convocatoria;
};

const crearConvocatoria = async (convocatoria) => {


    const consulta = 'INSERT INTO convocatoria SET ?';
    const [convocatoriaNuevo] = await conexion.query(consulta, convocatoria);

    // console.log(convocatoriaNuevo.insertId);

    return buscarConvocatoriaPorId(convocatoriaNuevo.insertId);
};

const editarConvocatoria = async (dato, idConvocatoria) => {
    const consulta = 'UPDATE convocatoria SET ? WHERE idConvocatoria = ?';

    const [result] = await conexion.query(consulta, [dato, idConvocatoria]);

    return buscarConvocatoriaPorId(idConvocatoria)
}


    module.exports = {
        buscarConvocaroriaTodos,
        buscarConvocatoriaPorId,
        crearConvocatoria,
        editarConvocatoria
    }