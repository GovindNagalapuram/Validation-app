import React, { useReducer } from 'react';
import axios from 'axios';
import StudentContext from './StudentContext';
import StudentReducer from './StudentReducer';
import { 
    TOGGLE_FILTER, 
    SEARCH_STUDENT, 
    CLEAR_SEARCH, 
    ADD_STUDENT, 
    REMOVE_STUDENT, 
    UPDATE_STUDENT,
    EDIT_STUDENT,
    CLEAR_EDIT,
    GET_STUDENTS,
    STUDENTS_ERROR 
} from '../types';

const StudentState = (props) => {

    const initialState = {
        filterStudent: false,
        search: null,
        editAble: null,
        students: [],
        errors: null
        // students: [
        //     {
        //         id: 1,
        //         name: "Govind Rajan",
        //         phone: "333 444 5555",
        //         subject: 'Maths',
        //         isConfirmed: false
        //     },
        //     {
        //         id: 2,
        //         name: "Govind",
        //         phone: "777 444 1111",
        //         subject: 'Science',
        //         isConfirmed: true
        //     },
        //     {
        //         id: 3,
        //         name: "Rajan",
        //         phone: "888 555 2222",
        //         subject: 'Commerce',
        //         isConfirmed: false
        //     },
        //     {
        //         id: 4,
        //         name: "harsh",
        //         phone: "888 555 2222",
        //         subject: 'Commerce',
        //         isConfirmed: true
        //     }
        // ]
    }

    const [ state, dispatch ] = useReducer(StudentReducer, initialState);

    // get sudents
    const getStudents = async () => {
        try {
            const res = await axios.get('/students')
            dispatch({
                type: GET_STUDENTS,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: STUDENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    // ADD STUDENT ACTION
    const addStudent = async (student) => {
        // student.id = Date.now()
        const config = {
            'Content-Type' : 'application/json'
        }
        try {
            const res = await axios.post('/students', student, config)
            // student.isConfirmed = false
            dispatch({
                type: ADD_STUDENT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: STUDENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    // REMOVE STUDENT ACTION before adding backend
    // const removeStudent = (id) => {
    //     dispatch({
    //         type: REMOVE_STUDENT,
    //         payload: id
    //     })
    // }

    // REMOVE STUDENT ACTION after adding backend
    const removeStudent = async (id) => {
        try {
            await axios.delete(`/students/${id}`)
            dispatch({
                type: REMOVE_STUDENT,
                payload: id
            })
        } catch (err) {
            dispatch({
                type: STUDENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    // UPDATE STUDENT ACTION before adding backend
    // const updateStudent = (student) => {
    //     dispatch({
    //         type: UPDATE_STUDENT,
    //         payload: student
    //     })
    // }

      // UPDATE STUDENT ACTION after adding backend
      const updateStudent = async (student) => {
        const config = {
            headers: {
                'Content-Type' : 'application/json' 
            }
        }
        try {
            const res = await axios.put(`/students/${student._id}`, student, config)
            dispatch({
                type: UPDATE_STUDENT,
                payload: res.data
            })
        } catch (err) {
            dispatch({
                type: STUDENTS_ERROR,
                payload: err.response.msg
            })
        }
    }

    // EDIT STUDENT DETAIL
    const editStudent = (student) => {
        dispatch({
            type: EDIT_STUDENT,
            payload: student
        })
    }

    const clearEdit = () => {
        dispatch({
            type: CLEAR_EDIT,
        })
    }
 
    const toggleFilter = () => {
        dispatch({
            type: TOGGLE_FILTER
        })
    }

    const searchStudent = (student) => {
        dispatch({
            type: SEARCH_STUDENT,
            payload: student
        })
    }

    const clearSearch = () => {
        dispatch({
            type: CLEAR_SEARCH
        })
    }
    // console.log(state)
    return(
        <div>
            <StudentContext.Provider
                value={{
                    students: state.students,
                    filterStudent: state.filterStudent,
                    toggleFilter,
                    search: state.search,
                    editAble: state.editAble,
                    getStudents,
                    addStudent,
                    removeStudent,
                    updateStudent,
                    editStudent,
                    clearEdit,
                    searchStudent,
                    clearSearch
                }}
            >
                {props.children}
            </StudentContext.Provider>
        </div>
    )
}

export default StudentState;