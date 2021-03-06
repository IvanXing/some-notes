import { ADD_TODO, TOGGLE_TODO, SET_TODO_TEXT, SET_FILTER} from '../actions/actionTypes'

const initialState = {
  filter: 'all',
  text: '',
  todos: [],
}

const todoApp = (state = initialState, action) => {
  switch(action.type) {
    case ADD_TODO:
      return {
        ...state,
        todos: [
          ...state.todos, 
          {
            id: action.id,
            text: action.text,
            completed: false
          }
        ]
      }
    case TOGGLE_TODO:
      return {
        ...state,
        todos: state.todos.map(todo => 
            todo.id === action.id ? {...todo, completed: !todo.completed} : todo
          )
      }
    case SET_TODO_TEXT:
      return {
        ...state,
        text: action.text
      }
    case SET_FILTER:
      return {
        ...state,
        filter: action.filter
      }
    default: 
      return state  
  }
}

export default todoApp