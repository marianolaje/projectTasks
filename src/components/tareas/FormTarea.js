import React, {useContext, useState, useEffect} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'

const FormTarea = () => {
    //extraer si un proyecto está activo
    const proyectosContext = useContext(proyectoContext)
    const { proyecto } = proyectosContext

    const tareasContext = useContext(tareaContext)
    const { agregarTarea, obtenerTareas, tareaSeleccionada, actualizarTarea } = tareasContext

    //Effect que detecta si hay una tarea seleccionada
    useEffect(()=>{
        if(tareaSeleccionada!==null){
            setTarea(tareaSeleccionada)
        } else {
            setTarea({
                nombre: ''
            })
        }
    }, [tareaSeleccionada])

    //state del formulario
    const [tarea, setTarea] = useState({
        nombre: '',
    })
    const [error, setError] = useState(false)

    //extraer el nombre del proyecto
    const {nombre} = tarea

    //si no hay proyectos seleccionados
    if(!proyecto){
        return null
    }

    //arrayDestructuring para extraer el proyecto actual
    const [ proyectoActual ]  = proyecto

    //leer los valores del form
    const handleChange = e => {
        setTarea({
            ...tarea,
            [e.target.name]: e.target.value
        })
    }

    const onSubmitTarea = e => {
        e.preventDefault();
        //validar
        if(nombre.trim()===''){
            setError(true)
            return
        }
        setError(false)

        //si es edicion o si es nueva tarea
        if(tareaSeleccionada===null){
            //agregar la nueva tarea al state de tareas
            tarea.proyecto = proyectoActual._id;
            agregarTarea(tarea);
        } else {
            //actualizar tarea existente
            actualizarTarea(tarea)
        }
        //Obtener y filtrar las tareas del proyecto actual
        obtenerTareas(proyectoActual._id)

        //reiniciar el form
        setTarea({
            nombre: ''
        })
    }

    return(
        <div className="formulario ">
            <form
                onSubmit={onSubmitTarea}
            >
                <div className="contenedor-input">
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Task name..."
                        name="nombre"
                        value={nombre}
                        onChange={handleChange}
                    />
                </div>
                <div className="contenedor-input">
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value={(tareaSeleccionada!==null) ? "Modify task" : "Add task"}
                    />
                </div>
                {error ? <p className="mensaje error">Complete the task name</p> : null}
            </form>
        </div>
    )
}

export default FormTarea