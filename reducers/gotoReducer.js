
export const newGoto=(state=0,action)=>{
  switch(action.type){
      case 'NEW_GOTO':
          return action.id
      default:
          return state
  }
}

export const newGotoTomorrow=(state=0,action)=>{
    switch(action.type){
        case 'NEW_GOTO_TOMORROW':
            return action.id
        default:
            return state
    }
}

export const listGotos=(state=[],action)=>{
    switch(action.type){
        case 'LIST_GOTOS':
            return action.gotos
        default:
            return state
    }
}

export const listGotosTomorrow=(state=[],action)=>{
    switch(action.type){
        case 'LIST_GOTOS_TOMORROW':
            return action.gotos_tomorrow
        default:
            return state

    }
}

export const markGotoDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_GOTO_DONE':
            return action.id
        default:
            return state
    }
}

export const markGotoUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_GOTO_UNDONE':
            return action.type
        default:
            return state
    }
}

export const deleteGoto=(state=0,action)=>{
   switch(action.type){
       case 'DELETE_GOTO':
           return action.id
        default:
            return state
   }
}