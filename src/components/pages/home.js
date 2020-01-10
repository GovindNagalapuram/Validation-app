import React, { useContext, useEffect } from 'react';
import AuthContext from '../../context/authContext/authContext';
import StudentForm from '../guests/studentForm';
import StudentCounter from '../guests/studentCounter';
import StudentFilter from '../guests/studentFilter';
import StudentSearch from '../guests/studentSearch';
import Students from '../guests/students';

const Home = () => {

    const { getUser } = useContext(AuthContext);

    useEffect(() => {
        getUser()
        // eslint disable next line
    }, [])
    
    return(
        <div className="app-container">
            <div className="main">
                <div className="filter">
                    <StudentFilter/>
                    <StudentSearch/>
                </div>
                <StudentForm/>
                <StudentCounter/>
            </div>
            <Students/>
        </div>
    )
} 

export default Home;