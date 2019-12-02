
export const newTodo=(state=0,action)=>{
   switch(action.type){
       case 'ADD_TODO':
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