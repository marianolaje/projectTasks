import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const NuevaCuenta = (props) => {

    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext

    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, registrarUsuario} = authContext

    //En caso de que el usuario se haya autenticado, o registrado, o sea un registro duplicado
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta(mensaje.msg, mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history])

    //state para iniciar sesion
    const [usuario, setUsuario] = useState({
        nombre: '',
        email: '',
        password: '',
        confirmar: ''
    })

    //aplicar destructuring al state usuario
    const {nombre, email, password, confirmar} = usuario

    const onChangeLogin = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    //cuando el usuario quiera iniciar sesion
    const onSubmit = e => {
        e.preventDefault()

        //Validar que no haya campos vacíos
        if(nombre.trim()==='' || email.trim()==='' || password.trim()==='' || confirmar.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
            return
        }

        //Password mínimo de 8 char
        if(password.length < 8){
            mostrarAlerta('El password debe ser de al menos 8 caracteres', 'alerta-error')
            return
        }

        //Los 2 password son iguales
        if(password !== confirmar){
            mostrarAlerta('No son iguales los passwords', 'alerta-error')
            return
        }

        //Pasarlo al Action
        registrarUsuario({
            nombre,
            email,
            password
        })
    }

    return(
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Register</h1>
                <form
                    onSubmit={onSubmit}
                >
                    <div className="campo-form">
                        <label htmlFor="nombre">Name</label>
                        <input
                            type="text"
                            id="nombre"
                            name="nombre"
                            placeholder="Your name"
                            value={nombre}
                            onChange={onChangeLogin}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="email">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Your email"
                            value={email}
                            onChange={onChangeLogin}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={onChangeLogin}
                        />
                    </div>
                    <div className="campo-form">
                        <label htmlFor="confirmar">Confirm password</label>
                        <input
                            type="password"
                            id="confirmar"
                            name="confirmar"
                            placeholder="Confirm password"
                            value={confirmar}
                            onChange={onChangeLogin}
                        />
                    </div>
                    <div className="campo-form">
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Register"
                        />
                    </div>
                </form>
                <Link 
                    to={'/'} 
                    className="enlace-cuenta"
                >Go back to Login
                </Link>
            </div>
        </div>
    )
}

export default NuevaCuenta