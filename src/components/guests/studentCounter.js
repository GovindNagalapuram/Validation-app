import React, { useContext } from 'react';
import StudentContext from '../../context/studentContext/StudentContext';

const StudentCounter = () => {
    
    const { students } = useContext(StudentContext);

    const totalInvited = students.length;
    const attending = students.filter(student => student.isconfirmed);
    const totalAttending = attending.length;

    const invitedBySubject = (type) => students.filter(student => student.subject === type).length
    const attendingBySubject = (type) => attending.filter(student => student.subject === type).length

    return(
        <div>
            <table>
                <tbody>
                    <tr>
                        <th>Student</th>
                        <th>Invited</th>
                        <th>Attending</th>
                    </tr>
                    <tr>
                        <th>Maths</th>
                        <td>{invitedBySubject('Maths')}</td>
                        <td>{attendingBySubject('Maths')}</td>
                    </tr>
                    <tr>
                        <th>Science</th>
                        <td>{invitedBySubject('Science')}</td>
                        <td>{attendingBySubject('Science')}</td>
                    </tr>
                    <tr>
                        <th>Commerce</th>
                        <td>{invitedBySubject('Commerce')}</td>
                        <td>{attendingBySubject('Commerce')}</td>
                    </tr>
                    <tr>
                        <th>Total</th>
                        <td>{totalInvited}</td>
                        <td>{totalAttending}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default StudentCounter;