import React, {useContext, useEffect} from 'react'
import AuthContext from '../../context/autenticacion/authContext'


const Barra = () => {

    //extraer la info de autenticacion
    const authContext = useContext(AuthContext)
    const { usuario, usuarioAutenticado, cerrarSesion } = authContext

    useEffect(()=>{
        usuarioAutenticado()

        //eslint-disable-next-line
    }, [])



    return(
        <header className="app-header">
            {usuario ? <p className="nombre-usuario">Hi <span> {usuario.nombre} </span></p> : <p className="nombre-usuario"></p>}
            <nav className="nav-principal">
                <button
                    className="btn btn-blank cerrar-sesion"
                    onClick={ () => cerrarSesion() }
                >
                    Logout
                </button>
            </nav>
        </header>
    )
}

export default Barra