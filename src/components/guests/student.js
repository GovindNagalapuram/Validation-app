import React, { useContext } from 'react';
import StudentContext from '../../context/studentContext/StudentContext';

const Student = ({student}) => {

    const { removeStudent, updateStudent, editStudent } = useContext(StudentContext);
    const { _id, name, phone, subject, isconfirmed } =  student;

    const handleRemove = () => {
        removeStudent(_id)
    }

    const handleIsConfirmed = () => {
        updateStudent({...student, isconfirmed: !isconfirmed})
    }

    return(
        <div className="student-card">
            <div className="card-head">
                <div>
                    <label className={`${isconfirmed && 'confirm'}`}>Confirmed
                        <input type="checkbox" onChange={handleIsConfirmed}/>
                    </label>
                </div>
                <div>
                    <button 
                        className="edit-remove"
                        onClick={() => editStudent(student)}
                    >
                        <p>Edit</p>
                    </button>
                    <button 
                        className="edit-remove"
                        onClick={handleRemove}
                    >
                        <p>Remove</p>
                    </button>
                </div>
            </div>
            <div className="card-body">
                <h2 className="name-container">{name}</h2>
                <span className={"badge " + (subject === 'Maths' ? 'red' : subject === 'Science' ? 'green' : 'seaGreen')}>{subject}</span>
                <div className="contact">
                    <h3>Phone-number</h3>
                    <p>{phone}</p>
                </div>
            </div>
        </div>
    )
}

export default Student;