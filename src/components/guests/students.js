import React, { useContext, useEffect } from 'react';
import StudentContext from '../../context/studentContext/StudentContext';
import Student from './student';

const Students = () => {
    const { students, filterStudent, search, getStudents } = useContext(StudentContext);
    // {console.log(students)}

    useEffect(() => {
        getStudents()
        // eslint-disable next line
    }, [])

    return(
        <div className="students">

            {/* {students.map(item => <Student key={item.id}/>)} */}
            
            {
                search !== null ? search.map(student => <Student key={student._id} student = {student}/>) :
                students.filter(student => !filterStudent || student.isconfirmed).map((student) => {
                    return(
                        <Student
                            key={student._id}
                            student = {student}
                        />
                    )
                })
            }
            {/* <Student /> */}
        </div>
    )
}

export default Students;