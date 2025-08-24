const alumnoModel = require('../models/alumnoModel');

registrarAlumno = async (req, res) => {

    console.log('Datos recibidos del frontend: ', req.body);
    
    const { nombre, curso, email, genero, idioma } = req.body;
    
    try{
        const alumnoExistente = await alumnoModel.obtenerAlumnoPorEmail(email);
        if(alumnoExistente){
            return res.status(409).json({ mensaje: 'El alumno ya existe' });
        }

        const alumno = await alumnoModel.crearAlumno(nombre, curso, email, genero, idioma);
        return res.status(201).json({ mensaje: 'Alumno registrado correctamente',  alumno});
    } catch(error){
        console.error('Error al registrar alumno:', error); 
        return res.status(500).json({ mensaje: 'Error del servidor', error: error.message });
    }
}

obtenerAlumnos = async (req, res) => {
    try{
        const alumnos = await alumnoModel.obtenerAlumnos();
        return res.status(200).json({ mensaje: 'Alumnos encontrados con éxito', alumnos})
    } catch(error){
        return res.status(500).json({ mensaje: 'Error del servidor', error });
    }
}

eliminarAlumno = async (req, res) => {
    const { id } = req.params;

    try{
        const resultado = await alumnoModel.eliminarAlumno(id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
        
        return res.status(200).json({ mensaje: 'Alumno eliminado correctamente', resultado})
    } catch(error){
        return res.status(500).json({ mensaje: 'Error del servidor', error});
    }
}

actualizarAlumno = async (req, res) => {
    const { id } = req.params;
    const { nombre, email, curso, genero, idioma } = req.body;

    if (!nombre || !email || !curso || !genero || !idioma) {
        return res.status(400).json({ mensaje: "No se recibieron datos para actualizar" });
    }

    try{
        const resultado = await alumnoModel.actualizarAlumno(nombre, email, curso, genero, idioma, id);

        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensaje: 'Alumno no encontrado' });
        }
        return res.status(200).json({ mensaje: 'Alumno actualizado correctamente', resultado})
    } catch(error){
        return res.status(500).json({ mensaje: 'Error del servidor', error}); 
    }
}

buscarAlumno = async (req, res) => {
    const { email } = req.query;
    //Si alguien hace la petición sin email en la query, la función va a llamar al modelo con undefined, y puede causar resultados inesperados o errores. 
    if (!email) {
            return res.status(400).json({ mensaje: 'Falta el parámetro email' });
    }

    try{
        const alumno = await alumnoModel.obtenerAlumnoPorEmail(email);

        if(!alumno){
            return res.status(404).json({ mensaje: 'No se encontró ningún alumno con ese Email'});
        } else{
            res.status(200).json({ mensaje: 'Alumno encontrado con éxito', alumno});
        }
        
    }catch(error){
        console.log(error); // el error lo ponemos poner en la consola para evitar mostrar información sensible,
        res.status(500).json({ mensaje: 'Error del servidor'});
    }
};

module.exports = {
    registrarAlumno,
    obtenerAlumnos,
    buscarAlumno,
    eliminarAlumno,
    actualizarAlumno
}

