
export const newTodo=(state=0,action)=>{
   switch(action.type){
       case 'ADD_TODO':
           return action.id
        default:
            return state
   }
}

export const newTodosTomorrow=(state=0,action)=>{
    switch(action.type){
        case 'ADD_TODO_TOMORROW':
            return action.id
        default:
            return state
    }
}

export const listTodos=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TODOS':
            return action.todos
        default:
            return state
    }
}

export const listTodosTomorrow=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TODOS_TOMORROW':
            return action.todos_tomorrow
        default:
            return state
    }
}

export const markTodoDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_TODO_DONE':
            return action.id
        default:
            return state
    }
}

export const markTodoUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_TODO_UNDONE':
            return action.id
        default:
            return state
    }
}

export const deleteTodo=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_TODO':
            return action.id
        default:
            return state
    }
}

export const listDoneTodo=(state=[],action)=>{
    switch(action.type){
        case 'FETCH_TODO_DONE':
            return action.donetodos
        default:
            return state
    }
}

