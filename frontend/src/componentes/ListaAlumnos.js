import React, { useEffect, useState } from "react";
import '../hojas-de-estilo/ListaAlumnos.css'
import axios from 'axios';
import { CURSOS, GENERO, IDIOMAS} from '../utils/diccionario';
import { Link } from 'react-router-dom';


function ListaAlumnos(){
    const[alumnos, setAlumnos] = useState([])
    const[contador, setContador] = useState(0);
    const[alumnoEnEdicion, setAlumnoEnEdicion] = useState(null);
    const[nuevoNombre, setNuevoNombre] = useState('');
    const[nuevoEmail, setNuevoEmail] = useState('');
    const[nuevoCurso, setNuevoCurso] = useState('');
    const[nuevoGenero, setNuevoGenero] = useState('');
    const[nuevoIdioma, setNuevoIdioma] = useState('');

    useEffect(() => { obtenerAlumnos() }, []);

    function manejarAlumnoEnEdicion(alumno){
        setAlumnoEnEdicion(alumno.id);
        setNuevoNombre(alumno.nombre);
        setNuevoEmail(alumno.email);
        setNuevoCurso(alumno.curso);
        setNuevoGenero(alumno.genero);
        setNuevoIdioma(alumno.idioma);
    }

    function manejarNuevoNombre(e){
        setNuevoNombre(e.target.value);
    }

    function manejarNuevoEmail(e){
        setNuevoEmail(e.target.value);
    }
    
    function manejarNuevoCurso(e){
        setNuevoCurso(e.target.value);
    }

    function manejarNuevoGenero(e){
        setNuevoGenero(e.target.value);
    }

    function manejarNuevoIdioma(e){
        setNuevoIdioma(e.target.value);
    }
        

    const obtenerAlumnos = async() => {

        try{
            const res = await axios.get(`http://localhost:3001/api/alumnos/lista-alumnos`);
            console.log('Respuesta del servidor:', res.data);
            
            if(res.status === 200){
                setAlumnos(res.data.alumnos);
                setContador(res.data.alumnos.length);
                console.log('Alumno mostrado con éxito');
            }
            
        } catch(error){
            console.log('Error:', error.response?.data || error.message);
        }

    }

    const eliminarAlumno = async(id) =>{
        const confirmar = window.confirm('¿Seguro que quieres eliminar este alumno?');
        if(!confirmar) return;

            try{
            const res = await axios.delete(`http://localhost:3001/api/alumnos/${id}`);
            const nuevaLista = alumnos.filter(alumno => alumno.id !== id);
            setAlumnos(nuevaLista);
            setContador(contador-1);
        
            console.log('Eliminado alumno con ID:', id);
        } catch(error){
            console.log('Error:', error.response?.data || error.message);
        }
    } 
    

    const manejarGuardar = async(id) =>{
        try{
            const res = await axios.put(`http://localhost:3001/api/alumnos/actualizar-alumno/${id}`, {
                nombre: nuevoNombre,
                curso: nuevoCurso,
                email: nuevoEmail,
                genero: nuevoGenero,
                idioma: nuevoIdioma
            });
            await obtenerAlumnos();
            setAlumnoEnEdicion(null);
            setNuevoNombre('');
            setNuevoEmail('');
            setNuevoCurso('');
            setNuevoGenero('');
            setNuevoIdioma('');

            console.log('Actualizado alumno con ID:', id);
        } catch(error){
            console.log('Error:', error.response?.data || error.message);
        }
    }
    

return(
    <form
    className='contenedor-lista-alumnos'
    method='get'>
        <header>
            <div className='contenedor-titulo'>
                <h1>Lista de Alumnos</h1>
                <span id='contador'>{contador}</span>   
            </div>
            
            <Link to='/' className='link-volver'>
                <button 
                id='boton-volver'
                className='boton'
                type='button'
                >
                
                    <svg
                        id= 'icono-volver'
                        width="26"
                        height="26"
                        viewBox="0 0 24 24"
                        fill="white"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path d="M10 19l-7-7 7-7v4h8v6h-8v4z" />
                    </svg>
                    <p id='parrafo-boton'>Volver a Registro</p>
                </button>
            </Link>
        </header>
        <hr />

        <table className='tabla'>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Alumno</th>
                    <th>Curso</th>
                    <th>Email</th>
                    <th>Sexo</th>
                    <th>Lenguas extranjeras</th>
                    <th>Acciones</th>

                </tr>
            </thead>
            <tbody>
                {alumnos.map((alumno) =>(
                    <tr key={alumno.id}>
                        {/* Hay que poner el nombre exacto de las columnas que usamos en mysql, los que pasamos también en el modelo*/}
                        <td>{alumno.id}</td>
                    
                        {/* NOMBRE */}
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <input
                            className='input'
                            name='nombre'
                            type='text'
                            value={nuevoNombre}
                            onChange={manejarNuevoNombre}
                            />)
                            : (alumno.nombre)}
                        </td>

                        {/* EMAIL */}
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <input
                            className='input'
                            name='email'
                            type='text'
                            value={nuevoEmail}
                            onChange={manejarNuevoEmail}
                            />) 
                            : (alumno.email)}
                        </td>

                        {/* CURSO */}
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <select
                            name='nueva-lista-cursos'
                            id='nueva-lista-cursos'
                            value={nuevoCurso}
                            onChange={manejarNuevoCurso}
                            >
                                <option value=''> -- Selecciona un curso --</option>
                                <option value='1eso' >1º ESO</option>
                                <option value='2eso'>2º ESO</option>
                                <option value='3eso'>3º ESO</option>
                                <option value='4eso'>4º ESO</option>
                                <option value='1bach'>1º Bachillerato</option>
                                <option value='2bach'>2º Bachillerato</option>
                            </select>
                            ) 
                            : (CURSOS[alumno.curso])}
                        
                        </td>
                        
                        {/* GÉNERO */}
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <select
                            name='nuevo-genero'
                            id='nuevo-genero'
                            value={nuevoGenero}
                            onChange={manejarNuevoGenero}
                            >
                                <option value=''> -- Selecciona un género --</option>
                                <option value='masculino'>Masculino</option>
                                <option value='femenino'>Femenino</option>
                                <option value='otro'>Otro</option>
                            </select>
                            ) 
                            : (GENERO[alumno.genero])}
                        </td>

                        {/* IDIOMAS */}
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <select
                            name='nuevo-idiomas'
                            id='nuevo-idiomas'
                            value={nuevoIdioma}
                            onChange={manejarNuevoIdioma}
                            >
                                <option value=''> -- Selecciona una opción --</option>
                                <option value='si' >Sí</option>
                                <option value='no'>No</option>
                            </select> 
                            ) : (IDIOMAS[alumno.idioma])}
                            
                        </td>

                        {/* ACCIONES */}  
                        
                        <td>
                            {alumnoEnEdicion === alumno.id ? (
                            <button
                            id ='boton-guardar'
                            className='boton-guardar'
                            type='button'
                            onClick = {() => manejarGuardar(alumno.id)}
                            >
                                Guardar cambios</button> 
                            ) 
                            : (
                                <div className='contenedor-iconos'>
                                    <button 
                                    id='boton-eliminar'
                                    type='button'
                                    onClick={() => eliminarAlumno(alumno.id)}
                                    >
                                        <svg className='boton-icono'  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                                            <path d="M 24 4 C 20.704135 4 18 6.7041348 18 10 L 11.746094 10 A 1.50015 1.50015 0 0 0 11.476562 9.9785156 A 1.50015 1.50015 0 0 0 11.259766 10 L 7.5 10 A 1.50015 1.50015 0 1 0 7.5 13 L 10 13 L 10 38.5 C 10 41.519774 12.480226 44 15.5 44 L 32.5 44 C 35.519774 44 38 41.519774 38 38.5 L 38 13 L 40.5 13 A 1.50015 1.50015 0 1 0 40.5 10 L 36.746094 10 A 1.50015 1.50015 0 0 0 36.259766 10 L 30 10 C 30 6.7041348 27.295865 4 24 4 z M 24 7 C 25.674135 7 27 8.3258652 27 10 L 21 10 C 21 8.3258652 22.325865 7 24 7 z M 13 13 L 35 13 L 35 38.5 C 35 39.898226 33.898226 41 32.5 41 L 15.5 41 C 14.101774 41 13 39.898226 13 38.5 L 13 13 z M 20.476562 17.978516 A 1.50015 1.50015 0 0 0 19 19.5 L 19 34.5 A 1.50015 1.50015 0 1 0 22 34.5 L 22 19.5 A 1.50015 1.50015 0 0 0 20.476562 17.978516 z M 27.476562 17.978516 A 1.50015 1.50015 0 0 0 26 19.5 L 26 34.5 A 1.50015 1.50015 0 1 0 29 34.5 L 29 19.5 A 1.50015 1.50015 0 0 0 27.476562 17.978516 z"></path>
                                        </svg>
                                    </button>
                                    <button 
                                    id='boton-actualizar'
                                    type='button'
                                    onClick={() => manejarAlumnoEnEdicion(alumno)}
                                    >
                                        <svg className='boton-icono'  xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 30 30">
                                            <path d="M 15 3 C 12.031398 3 9.3028202 4.0834384 7.2070312 5.875 A 1.0001 1.0001 0 1 0 8.5058594 7.3945312 C 10.25407 5.9000929 12.516602 5 15 5 C 20.19656 5 24.450989 8.9379267 24.951172 14 L 22 14 L 26 20 L 30 14 L 26.949219 14 C 26.437925 7.8516588 21.277839 3 15 3 z M 4 10 L 0 16 L 3.0507812 16 C 3.562075 22.148341 8.7221607 27 15 27 C 17.968602 27 20.69718 25.916562 22.792969 24.125 A 1.0001 1.0001 0 1 0 21.494141 22.605469 C 19.74593 24.099907 17.483398 25 15 25 C 9.80344 25 5.5490109 21.062074 5.0488281 16 L 8 16 L 4 10 z"></path>
                                        </svg>
                                    </button>
                                </div>
                            )}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    </form>
);
}

export default ListaAlumnos;