import React, {useState, useContext, useEffect} from 'react'
import {Link} from 'react-router-dom'
import AlertaContext from '../../context/alertas/alertaContext'
import AuthContext from '../../context/autenticacion/authContext'

const Login = (props) => {
    
    //extraer los valores del context
    const alertaContext = useContext(AlertaContext)
    const {alerta, mostrarAlerta} = alertaContext
    
    const authContext = useContext(AuthContext)
    const {mensaje, autenticado, iniciarSesion} = authContext

    //En caso de que el password o usuario no exista
    useEffect(()=>{
        if(autenticado){
            props.history.push('/proyectos')
        }
        if(mensaje){
            mostrarAlerta('El mail o password son incorrectos', mensaje.categoria)
        }
        //eslint-disable-next-line
    },[mensaje, autenticado, props.history])
    
    //state para iniciar sesion
    const [usuario, setUsuario] = useState({
        email: '',
        password: ''
    })

    //aplicar destructuring al state usuario
    const {email, password} = usuario

    const onChangeLogin = e => {
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = e => {
        e.preventDefault()

        //validar que no haya campos vacíos
        if(email.trim()==='' || password.trim()===''){
            mostrarAlerta('Todos los campos son obligatorios', 'alerta-error')
        }

        //pasarlo al action
        iniciarSesion({email, password})
    }
    
    return(
        <div className="form-usuario">
            {alerta ? (<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>) : null}
            <div className="contenedor-form sombra-dark">
                <h1>Login</h1>
                <form
                    onSubmit={onSubmit}
                >
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
                        <input
                            type="submit"
                            className="btn btn-primario btn-block"
                            value="Login"
                        />
                    </div>
                </form>
                <Link 
                    to={'nueva-cuenta'} 
                    className="enlace-cuenta"
                >Create account
                </Link>
            </div>
        </div>
    )
}

export default Login