import React, { useContext } from 'react';
import StudentContext from '../../context/studentContext/StudentContext'

const StudentFilter = () => {

    const { toggleFilter } = useContext(StudentContext)

    return(
        <div className="toggle">
            <label className="switch">
                <input type="checkbox" onChange={() => toggleFilter()}/>
                <span className="slider round"></span>
            </label>
            <p className="lead">Show attending only!</p>
        </div>
    )
}

export default StudentFilter;