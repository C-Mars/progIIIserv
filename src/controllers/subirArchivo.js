const multer = require('multer');

/*
configuracion multer.
le indicamos donde guardamos los archivos
y el nombre del archivo
*/
const storage = multer.diskStorage({
    //donde se guardan los archivos
    destination: function (req, file, cb) {
        //Carpeta archivos
        cb(null, 'src/archivos');
    },
    filename:function(req, file, cb) {  // asignamos el nombre del archivo 
        // Agrega feha + hora + nro aleatoria para poder diferenciarlo si hay un archivo con el mismo nombre    
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '-' + file.originalname ); //file.originalname anexa el nombre original del archivo
    }
  })
  
  const upload = multer({ storage: storage });

  exports.upload = upload.single('foto');