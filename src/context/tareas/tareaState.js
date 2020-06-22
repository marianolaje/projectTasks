import React, {useReducer} from 'react'
import tareaContext from './tareaContext'
import TareaReducer from './tareaReducer'
import {
    TAREAS_PROYECTO,
    AGREGAR_TAREA,
    ELIMINAR_TAREA,
    TAREA_ACTUAL,
    ACTUALIZAR_TAREA
} from '../../types'
import clienteAxios from '../../config/axios'

const TareaState = props => {
    const initialState = {
        tareasProyecto: [],
        tareaSeleccionada: null
    }

    //Crear dispatch y state
    const [state, dispatch] = useReducer(TareaReducer, initialState);

    //crear las funciones

    //obtener las tareas de un proyecto
    const obtenerTareas = async proyecto => {
        try{
            const resultado = await clienteAxios.get('/api/tareas', {params: {proyecto}})
            dispatch({
                type: TAREAS_PROYECTO,
                payload: resultado.data.tareas
            })
        } catch (err){
            console.log(err)
        }

    }

    //agregar tarea al proyecto seleccionado
    const agregarTarea = async tarea => {
        try{
            const resultado = await clienteAxios.post('/api/tareas', tarea)
            dispatch({
                type: AGREGAR_TAREA,
                payload: tarea
            })
        } catch(err){
            console.log(err)
        }
    }

    ///eliminando una tarea por ID
    const eliminarTarea = async (id, proyecto) => {
        try{
            await clienteAxios.delete(`/api/tareas/${id}`, {params: {proyecto}})
            dispatch({
                type: ELIMINAR_TAREA,
                payload: id
            })
        } catch(err){
            console.log(err)
        }
    }

    //Editar o modificar una tarea
    const actualizarTarea = async tarea => {
        try{
            const resultado = await clienteAxios.put(`/api/tareas/${tarea._id}`, tarea)
            dispatch({
                type: ACTUALIZAR_TAREA,
                payload: resultado.data.tarea
            })
        } catch(err){
            console.log(err)
        }
    }

    //extrae una tarea para edicion
    const guardarTareaActual = tarea => {
        dispatch({
            type: TAREA_ACTUAL,
            payload: tarea
        })
    }


    return(
        <tareaContext.Provider
            value={{
                tareasProyecto: state.tareasProyecto,
                tareaSeleccionada: state.tareaSeleccionada,
                obtenerTareas,
                agregarTarea,
                eliminarTarea,
                guardarTareaActual,
                actualizarTarea
            }}
        >
            {props.children}
        </tareaContext.Provider>
    )
}
export default TareaState