import React, {Fragment, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'
import tareaContext from '../../context/tareas/tareaContext'
import Tarea from './Tarea'
import {CSSTransition, TransitionGroup} from 'react-transition-group'


const ListadoTareas = () => {
    //context
    const proyectosContext = useContext(proyectoContext)
    const { proyecto, eliminarProyecto, refrescarEliminar } = proyectosContext

    //context
    const tareasContext = useContext(tareaContext)
    const { tareasProyecto } = tareasContext

    //si no hay proyectos seleccionados
    if(!proyecto){
        return <h2>Select a project</h2>
    }

    //arrayDestructuring para extraer el proyecto actual
    const [ proyectoActual ]  = proyecto

    //eliminar un proyecto seleccionado
    const onClickEliminar = () => {
        eliminarProyecto(proyectoActual._id)
    }

    const llamadaFuncion = () => {
        refrescarEliminar()
        onClickEliminar()
    }

    return(
        <Fragment>
            <h2>Proyect: {proyectoActual.nombre}</h2>
            <ul className="listado-tareas">
                {tareasProyecto.length===0 
                    ? (<li className="tarea"><p>No hay tareas</p></li>)
                    : <TransitionGroup>
                        {tareasProyecto.map(tarea => (
                            <CSSTransition
                                key={tarea._id}
                                timeout={200}
                                classNames="tarea"
                            >
                                <Tarea
                                    key={tarea._id}
                                    tarea={tarea}
                                />
                            </CSSTransition>
                        ))}
                    </TransitionGroup>
                }
            </ul>
            <button
                type="button"
                className="btn btn-eliminar"
                onClick={()=>llamadaFuncion()}
                
            >
                Delete project &times;
            </button>
        </Fragment>
    )
}

export default ListadoTareas