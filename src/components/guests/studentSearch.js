import React, { useContext, useRef } from 'react';
import StudentContext from '../../context/studentContext/StudentContext';

const StudentSearch = () => {
    const { searchStudent, clearSearch } = useContext(StudentContext)
    const searchValue = useRef('')

    const handleChange = (e) => {
        if(searchValue.current.value !== ''){
            searchStudent(e.target.value)
        } else {
            clearSearch()
        }
    }

    return(
        <div>
            <input 
                ref={searchValue} 
                type="text" 
                className="search" 
                placeholder="Search student by name..."
                onChange={handleChange}
            />
        </div>
    )
}

export default StudentSearch;