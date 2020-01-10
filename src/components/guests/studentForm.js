import React, { useState, useContext, useEffect } from 'react';
import StudentContext from '../../context/studentContext/StudentContext';

const StudentForm = () => {

    const { addStudent, editAble, updateStudent, clearEdit } = useContext(StudentContext);

    const [ student, setStudent ] = useState({
        name: '',
        phone: '',
        subject: 'Maths'
    });

    useEffect(() => {
        if(editAble !== null){
            setStudent(editAble)
        } else {
            setStudent({
                name: '',
                phone: '',
                subject: 'Maths'
            })
        }
    }, [editAble])


    const { name, phone, subject } = student;

    const handleChange = (e) => {
        setStudent({
            ...student,
            [e.target.name]: e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if(editAble !== null){
            updateStudent(student)
            clearEdit()
        }else{
            addStudent(student)
            setStudent({
                name: '',
                phone: '',
                subject: 'Maths'
            })
        }
    }

    return(
        <div className="invite-section">
            <h1>{editAble !== null ? 'Edit student' : 'Invite Student'}</h1>
            <form onSubmit={onSubmit}>
                <input 
                    type="text" 
                    placeholder="Name" 
                    name="name" 
                    value={name} 
                    onChange={handleChange}
                />
                <input 
                    type="text" 
                    placeholder="Phone" 
                    name="phone" 
                    value={phone}
                    onChange={handleChange}
                />
                <p className="options-label">Subjects</p>
                <div className="options">
                    <label className="container">Maths
                        <input 
                            type="radio" 
                            name="subject" 
                            value="Maths" 
                            checked={subject === 'Maths'}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Science
                        <input 
                            type="radio" 
                            name="subject" 
                            value="Science"
                            checked={subject === 'Science'}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                    <label className="container">Commerce
                        <input 
                            type="radio" 
                            name="subject" 
                            value="Commerce"
                            checked={subject === 'Commerce'}
                            onChange={handleChange}
                        />
                        <span className="checkmark"></span>
                    </label>
                </div>
                <input type="submit" value={editAble !== null ? 'Update student' : 'Add Student'} className="btn"/>
                {
                    editAble !== null ? 
                        <input type="button" onClick={clearEdit} value="Cancel"/>
                        : null
                }
            </form>
        </div>
    )
}

export default StudentForm;