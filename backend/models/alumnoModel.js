const pool = require('../bd');

const crearAlumno = async (nombre, curso, email, genero, idioma) =>{
    const sql = 'INSERT INTO alumnos (nombre, curso, email, genero, idioma) VALUES (?, ?, ?, ?, ?)';
    try{
        const [result] = await pool.query(sql, [nombre, curso, email, genero, idioma]);
        return result;
    } catch (error){
        throw error;
    }
};

const obtenerAlumnos = async () => {
    const sql = 'SELECT * FROM alumnos';
    try{
        const[rows] = await pool.query(sql);
        return rows;
    } catch(error){
        throw error;
    }
}

const obtenerAlumnoPorEmail = async(email) => {
    const sql = 'SELECT * FROM alumnos WHERE email=?';
    try{
        const[rows] = await pool.query(sql, [email]);
        return rows[0];
    } catch(error){
        throw error;
    }
}

const eliminarAlumno = async(id) => {
    const sql = 'DELETE FROM alumnos WHERE id=?';
    try{
        const[result] = await pool.query(sql, [id]);
        return result;
    } catch(error){
        throw error;
    }
}

const actualizarAlumno = async(nombre, email, curso, genero, idioma, id) => {
    const sql = 'UPDATE alumnos SET nombre=?, email=?, curso=?, genero=?, idioma=? WHERE id=?';
    try{
        const[result] = await pool.query(sql, [nombre, email, curso, genero, idioma, id]);
        return result;
    } catch(error){
        throw error;
    }
}


module.exports={
    crearAlumno,
    obtenerAlumnos,
    obtenerAlumnoPorEmail,
    eliminarAlumno,
    actualizarAlumno
};