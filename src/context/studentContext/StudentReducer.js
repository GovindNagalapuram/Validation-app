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

export default (state, {type, payload}) => {
    switch(type){
        case GET_STUDENTS:
            return{
                ...state,
                students: payload
            }
        case ADD_STUDENT: 
            return{
                ...state,
                students: [...state.students, payload]
            }
        case REMOVE_STUDENT:
            return{
                ...state,
                students: state.students.filter(student => student._id !== payload)
            }
        case UPDATE_STUDENT:
            return{
                ...state,
                students: state.students.map(student => student._id === payload._id ? payload : student) 
            }
        case EDIT_STUDENT: 
            return{
                ...state,
                editAble: payload
            }
        case CLEAR_EDIT: 
            return{
                ...state,
                editAble: null
            }
        case SEARCH_STUDENT:
            const reg = new RegExp(`${payload}`, 'gi')
            return{
                ...state,
                search: state.students.filter(student => student.name.match(reg))
            }
        case STUDENTS_ERROR:
            return{
                ...state,
                students: [],
                errors: payload
            }
        case CLEAR_SEARCH:
            return{
                ...state,
                search: null
            }
        case TOGGLE_FILTER: 
            return{
                ...state,
                filterStudent: !state.filterStudent
            }
        default:
            return state
    }
}


