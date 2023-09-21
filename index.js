// módulo
const express = require('express');

//utilizar ap entorno y agrego un archivo .env
require('dotenv').config();

//utilizar nodemailer para enviar un email->importo el módulo
const nodemailer = require('nodemailer');

// utilizar el módulo cors
const cors = require('cors');

//  aplicación utilice el módulo express 
const app = express();

//  aplicación utilice el módulo express 
app.use(cors());

// para que los datos que ingresen sean en formato json.
app.use(express.json());
app.use(express.urlencoded({extended:true}));

// definir un rutas
app.get('/', (req,res)=>{
    // console.log('GET funciona')
    const saludo = 'Hola salió';
    res.status(200).json({saludo});
});

app.post('/contacto',(req,res)=>{
   
    // obtengo los datos del formulario de Contacto (CampusAFA)
    const {nombreyapellido,email,asunto,comentario} = req.body;
    console.log(nombreyapellido);
    console.log(email);
    console.log(asunto);
    console.log(comentario);

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
    // Cuerpo del correo se puede personalizar más(agregando + html y css)
    // const cuerpo =  `<h1>Hola llegó un correo de Contacto de parte de  ${nombre}  sobre  ${asunto} </h1>;
    
    
    const cuerpo = '<h1>Hola llegó un correo de Contacto </h1>';
    
    const opciones = {
        from : 'API CampusAFA',
        to : 'queloniochem@gmail.com',
        suject: 'Contacto',
        html: cuerpo
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
    })
    


});


/*listen recibe dos los parámetros: 1- puerto en donde el servidor se encarga de 
atender, 2-f de callback (utilizo un console para saber si funciona)*/ 
app.listen(process.env.PUERTO,()=>{
       console.log('API Campus AFA iniciada'); 
});