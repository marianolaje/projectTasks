import React, {useState, Fragment, useContext} from 'react'
import proyectoContext from '../../context/proyectos/proyectoContext'

const NuevoProyecto = () => {

    //obtener el State del Formulario
    const proyectosContext = useContext(proyectoContext)
    const { 
        formulario,
        errorformulario, 
        mostrarFormulario, 
        agregarProyecto,
        mostrarError 
    } = proyectosContext

    //state para Proyecto
    const [proyecto, setProyecto] = useState({
        nombre: ''
    })

    //destructuring para retirar el valor Nombre
    const {nombre} = proyecto

    //actualizamos y guardamos los cambios
    const onChangeProyecto = e => {
        setProyecto({
            ...proyecto,
            [e.target.name]: e.target.value
        })
    }

    //cuando el usuario crea proyecto
    const onSubmitProyecto = e => {
        e.preventDefault()

        //validar
        if(nombre.trim()===''){
            mostrarError(true)
            return
        }
        //agregar al state
        agregarProyecto(proyecto)

        //reiniciar form
        setProyecto({
            nombre: ''
        })
    }

    return(
        <Fragment>
            <button
                type="button"
                className="btn btn-block btn-primario"
                onClick={()=> mostrarFormulario()}
            >
            New Project    
            </button>
            { formulario 
                ? (<form
                    className="formulario-nuevo-proyecto"
                    onSubmit={onSubmitProyecto}
                >
                    <input
                        type="text"
                        className="input-text"
                        placeholder="Project name"
                        name="nombre"
                        value={nombre}
                        onChange={onChangeProyecto}
                    />
                    <input
                        type="submit"
                        className="btn btn-primario btn-block"
                        value="Add project"
                    />
                </form>)
                : null
            }
            { errorformulario
                ? <p className="mensaje error">Name it's required</p>
                : null
            }
        </Fragment>
    )
}

export default NuevoProyecto