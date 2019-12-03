export const newProject=(state=0,action)=>{
   switch(action.type){
       case 'NEW_PROJECT':
           return action.id
        default:
            return state
   }
}

export const listProjects=(state=[],action)=>{
   switch(action.type){
       case 'LIST_PROJECTS':
           return action.projects
        default:
            return state
   }
}

export const markProjectDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_PROJECT_DONE':
            return action.id
        default:
            return state
    }
}

export const markProjectUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_PROJECT_UNDONE':
            return action.id
        default:
            return state
    }
}