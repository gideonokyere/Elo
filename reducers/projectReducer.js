export const newProject=(state=0,action)=>{
   switch(action.type){
       case 'NEW_PROJECT':
           return action.id
        default:
            return state
   }
}

export const newTomorrowProject=(state=0,action)=>{
    switch(action.type){
        case 'NEW_TOMORROW_PROJECT':
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

export const listTomorrowProjects=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TOMORROW_PROJECTS':
            return action.tomorrow_projects
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

export const deleteProject=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_PROJECT':
            return action.id
        default:
            return state
    }
}

export const listDoneProject=(state=[],action)=>{
   switch(action.type){
       case 'LIST_DONE_PROJECT':
           return action.doneProject
        default:
            return state
   }
}

export const dropProject=(state=0,action)=>{
  switch(action.type){
      case 'DROP_PROJECT':
          return action.id
      default:
          return state
  }
}

export const undropProject=(state=0,action)=>{
    switch(action.type){
        case 'UNDROP_PROJECT':
            return action.id
        default:
            return state
    }
}

export const addProjectByDate=(state=0,action)=>{
   switch(action.type){
       case 'ADD_PROJECT_BY_DATE':
           return action.id
        default:
            return state
   }
}

export const listProjectByDate=(state=[],action)=>{
    switch(action.type){
        case 'LIST_PROJECT_BY_DATE':
            return action.projectdates
        default:
            return state
    }
}