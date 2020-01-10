import React, { useContext, Fragment } from 'react';
import AuthContext from '../../context/authContext/authContext';
import { Link } from 'react-router-dom';

// fragment create a invisible div or ghost div

const Navbar = () => {
    
    const { logout, clearError, userAuth, user } = useContext(AuthContext);

    const onLogout = () => {
        logout()
        clearError()
    }

    const userLinks = (
        <Fragment>
            <li>Hello {user && user.name}</li>
            <span className="bar-space">|</span>
            <li>
                <a href="#!" onClick={onLogout}>
                    <span>Logout</span>
                </a>
            </li>
        </Fragment>
    )

    const authLinks = (
        <Fragment>
            <li>
                <Link to="/register">Register</Link>
            </li>
            <span className="bar-space">|</span>
            <li>
                <Link to="/login">Login</Link>
            </li>
        </Fragment>
    )

    return(
        <div className="navbar">
            <div className="logo">
                <h1 className="logo-container">Mern-App</h1>
            </div>  
            <ul>
                {
                    userAuth ? userLinks: authLinks
                }
            </ul>   

        </div>
    )
}

export default Navbar;