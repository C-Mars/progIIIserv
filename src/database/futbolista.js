const conexion = require('./conexionBD');

/*exports.buscarFutbolista = async () => {

    const consulta = `SELECT  dni, nombre, apellido,
    (CASE
        WHEN posicion = 0 THEN 'arquero'
        WHEN posicion = 1 THEN 'defensor'
        WHEN posicion = 2 THEN 'mediocampista'
        WHEN posicion = 3 THEN 'delantero'
        ELSE ''
    END) AS posicion 
    FROM futbolista 
    WHERE activo = 1`;

    //const [futbolista] = await conexion.query(consulta,);    

    return futbolista;
}*/


