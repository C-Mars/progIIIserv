const conexion = require('./conexionBD');




const buscarTodosConvocaroria = async () => {

    const consulta = `SELECT * FROM convocatoria as 
    c INNER JOIN rival AS r ON r.idRival = c.rival WHERE c.activo = 1`;

    const [convocatorias] = await conexion.query(consulta);    

    return convocatorias;
};

const buscarConvocatoriaPorId = async (idConvocatoria) => {

    const consulta = `SELECT * FROM convocatoria as c
                        INNER JOIN rival AS r ON r.idRival = c.rival
                        WHERE c.activo = 1 AND c.idConvocatoria = ?`;

    const [convocatoria] = await conexion.query(consulta, idConvocatoria);

    return convocatoria;
};

const crearConvocatoria = async (convocatoria) => {


    const consulta = `INSERT INTO convocatoria SET ?`;
    const [convocatoriaNuevo] = await conexion.query(consulta, convocatoria);

    // console.log(convocatoriaNuevo.insertId);

    return buscarConvocatoriaPorId(convocatoriaNuevo.insertId);
};

const editarConvocatoria = async (convocatoria, idConvocatoria) => {

    const consulta = `UPDATE convocatoria SET fecha='${convocatoria.fecha}', rival= '${convocatoria.rival}' WHERE idConvocatoria = '${idConvocatoria}' AND  convocatoria.activo = 1`
    ;

    const [result] = await conexion.query(consulta, [convocatoria, idConvocatoria]);

    return (
        
        buscarConvocatoriaPorId(idConvocatoria)
    )

}
const editarResultados = async (convocatoria, idConvocatoria) => {
    const consulta = `UPDATE convocatoria SET golesRecibidos = '${convocatoria.golesRecibidos}', golesConvertidos = '${convocatoria.golesConvertidos}' WHERE idConvocatoria = '${idConvocatoria}'`;

    const [result] = await conexion.query(consulta, [convocatoria, idConvocatoria]);

    return (
        
        buscarConvocatoriaPorId(idConvocatoria)
    )

}

const eliminarConvocatoria = async (idConvocatoria) => {
    const consulta = 'UPDATE convocatoria SET activo = 0 WHERE idConvocatoria = ?';
    await conexion.query(consulta, [idConvocatoria]);    
}

    module.exports = {
        buscarTodosConvocaroria,
        buscarConvocatoriaPorId,
        crearConvocatoria,
        editarConvocatoria,
        eliminarConvocatoria,
        editarResultados
    }