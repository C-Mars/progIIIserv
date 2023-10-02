//utilizar nodemailer para enviar un email->importo el módulo
const nodemailer = require('nodemailer');
//para trabajar con el sistema de archivos: crear leer etc archivos
const fs = require('fs');
// trabajar con las rutas de archivos y directorios del sistema de archivos
const path = require('path');

const handlebars = require('handlebars');



exports.enviarCorreo = async(req,res) =>{
    
    // obtengo los datos del formulario de Contacto (CampusAFA)
    const {nombreyapellido,email,asunto,comentario} = req.body;
    
    const plantillaHds2 = fs.readFileSync(path.join(__dirname, '../tools/handlebars/plantilla.hbs'), 'utf8');
    
    const correoTemplate = handlebars.compile(plantillaHds2);
  
    // Datos de la plantilla
    const datos = {
        nombreyapellido: nombreyapellido,
        email: email,
        asunto: asunto,
        comentario: comentario
      };
  
    // Renderizo la plantilla con los datos
    const correoHtml = correoTemplate(datos);
  
    // console.log(nombreyapellido);
    // console.log(email);
    // console.log(asunto);
    // console.log(comentario);

    
    /*parra mandar un email 
    se def TRASPORTADOR (correo de envio, clase y servicio)  
    OPCIONES DE EMAIL(título,cuerpo a quién).
    */
    const transporter = nodemailer.createTransport({
        // que servicio voy a utilizar para mandar el correo
        service:'gmail',
        // datos del usuario
        auth:{
            user:process.env.CORREO,
            pass:process.env.CLAVE
        },
        // Código para solucionar el problema de autorización 
        tls: {
            rejectUnauthorized: false
        }
    });
    
    const opciones = {
        from : 'API CampusAFA',
        to : 'queloniochem@gmail.com',
        suject: 'Contacto',
        html: correoHtml
    }
    // enviar un email
    transporter.sendMail(opciones,(error,info)=>{
        if(error){
            console.log('error ->', error);
            const respuesta = 'correo no enviado';
            res.status(200).json(respuesta);
        }else{
            console.log(info)
            const respuesta = 'correo enviado';
            res.status(200).json(respuesta);
        }
    });
}; 