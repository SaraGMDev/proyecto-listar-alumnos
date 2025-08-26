import React, { use, useState } from "react";
import '../hojas-de-estilo/FormularioRegistro.css'
import axios from 'axios';
import { Link } from 'react-router-dom';

function FormularioRegistro(){
    const[nombreAlumno, setNombreAlumno] = useState('');
    const[emailAlumno, setEmailAlumno] = useState('');
    const[curso, setCurso] = useState('');
    const[lenguasExtranjeras, setLenguasExtranjeras] = useState('');
    const[generoAlumno, setGeneroAlumno] = useState('');
    const[error, setError] = useState('');


    function manejarNombreAlumno(e){
        setNombreAlumno(e.target.value);
    }

    function manejarEmailAlumno(e){
        setEmailAlumno(e.target.value);
    }

    function manejarCurso(e){
        setCurso(e.target.value);
    }

    function manejarLenguasExtranjeras(e){
        setLenguasExtranjeras(e.target.value);
    }

    function manejarGenero(e){
        setGeneroAlumno(e.target.value);
    }

    const manejarEnvio = async (e) => {
        e.preventDefault();

        if(nombreAlumno.trim()==='' || emailAlumno.trim()===''|| curso==='' || lenguasExtranjeras==='' || generoAlumno === ''){
            setError('Este campo es obligatorio');
            return; // Evita que se registre
        } 

        try{
            const res = await axios.post('http://localhost:3001/api/alumnos/', { 
                nombre: nombreAlumno, // el segundo valor, es el parámetro que ponemos en el useState
                curso: curso,
                email: emailAlumno, 
                genero: generoAlumno,
                idioma: lenguasExtranjeras
            });
            console.log('Respuesta del servidor:', res.data);

            if(res.status === 200){
                console.log('Alumno registrado exitosamente');
                }
        

        } catch(error){
            console.log('Error en registro:', error.response?.data || error.message);
        }
        setNombreAlumno('');
        setCurso('');
        setEmailAlumno('');
        setGeneroAlumno('');
        setLenguasExtranjeras('');
        setError('');
    }

return(
    <form
    className='contenedor-formulario'
    onSubmit={manejarEnvio}
    method='post'
    >
        <h1>Registrar alumno</h1>
        <hr />
        <label>Nombre del Alumno</label>
        {error && <span className='error'>⚠️{error}</span>}    
            <input
            className='input'
            name='nombre'
            type='text'
            value={nombreAlumno}
            onChange={manejarNombreAlumno}
            />
            

            <label>Email del Alumno</label>
            {error && <span className='error'>⚠️{error}</span>}
            <input
            className='input'
            name='email'
            type='email'
            value={emailAlumno}
            onChange={manejarEmailAlumno}
            />
            

            <label htmlFor="lista-cursos">Seleccione el curso </label>
            {error && <span className='error'>⚠️{error}</span>}
            <select
            name='lista-cursos'
            id='lista-cursos'
            value={curso}
            onChange={manejarCurso}
            >
                <option value=''> -- Selecciona un curso --</option>
                <option value='1eso' >1º ESO</option>
                <option value='2eso'>2º ESO</option>
                <option value='3eso'>3º ESO</option>
                <option value='4eso'>4º ESO</option>
                <option value='1bach'>1º Bachillerato</option>
                <option value='2bach'>2º Bachillerato</option>
            </select>
            

            <label>Género del Alumno</label>
            {error && <span className='error'>⚠️{error}</span>}
            <div
            className='contenedor-radio'
            >
                <label htmlFor="masculino">
                    <input 
                    id='masculino' 
                    type='radio' 
                    name='generoAlumno' 
                    value='masculino' 
                    className='input-radio'
                    checked={generoAlumno === 'masculino'}
                    onChange={manejarGenero}
                    />
                    Masculino
                </label>

                <label htmlFor="femenino">
                    <input id='femenino' 
                    type='radio'
                    name='generoAlumno'
                    value='femenino' 
                    className='input-radio' 
                    checked = {generoAlumno === 'femenino'}
                    onChange={manejarGenero}
                    />
                    Femenino
                </label>
            
                <label htmlFor="otro">
                    <input 
                    id='otro' 
                    type='radio' 
                    name='generoAlumno' 
                    value='otro' 
                    className='input-radio'
                    checked = {generoAlumno === 'otro'}
                    onChange={manejarGenero}
                    />
                    Otro
                </label>
            </div>

            <label className='label-radio'>¿Habla una o más lenguas extranjeras?</label>
            {error && <span className='error'>⚠️{error}</span>}
            <div
            className="contenedor-radio"
            >
                <label htmlFor="si">
                    <input 
                    id='si' 
                    type='radio' 
                    name='lenguasExtranjeras' 
                    value='si' 
                    className='input-radio'
                    checked={lenguasExtranjeras==='si'}
                    onChange={manejarLenguasExtranjeras}
                    />
                    Sí
                </label>
                <label htmlFor="no">
                    <input 
                    id='no' 
                    type='radio' 
                    name='lenguasExtranjeras' 
                    value='no' 
                    className='input-radio'
                    checked={lenguasExtranjeras==='no'}
                    onChange={manejarLenguasExtranjeras}
                    />
                    No
                </label>
            </div>
            
            <div className='contenedor-botones'>
                <button
                className='boton'
                id='boton-submit'
                type='submit'
                name='submit'
                >
                    Registrar nuevo alumno</button>
                <Link to='/lista-alumnos' className='link-lista-alumnos'>
                    <button
                    className='boton'
                    id='boton-lista-alumnos'
                    name='lista-alumnos'
                    type='button'
                    >
                        Listado de Alumnos
                    </button>
                </Link>
                
            </div>
            

    </form>
)
}

export default FormularioRegistro;