export const newDaily=(state=0,action)=>{
   switch(action.type){
       case 'NEW_DAILY':
           return action.id
        default:
            return state
   }
}

export const listDailys=(state=[],action)=>{
    switch(action.type){
        case 'LIST_DAILYS':
            return action.dailys
        default:
            return state
    }
}

export const markDailyDone=(state=0,action)=>{
   switch(action.type){
       case 'MARK_DAILY_DONE':
           return action.id
        default:
            return state
   }
}

export const markDailyUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_DAILY_UNDONE':
            return action.id
        default:
            return state
    }
}

export const deleteDaily=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_DAILY':
            return action.id
        default:
            return state
    }
}

export const listDoneDaily=(state=[],action)=>{
    switch(action.type){
        case 'LIST_DONE_DAILY':
            return action.doneDaily
        default:
            return state
    }
}

export const dropCallTask=(state=0,action)=>{
    switch(action.type){
        case 'DROP_CALL_TASK':
            return action.id
        default:
            return state;
    }
}

export const undropCallTask=(state=0,action)=>{
    switch(action.type){
        case 'UNDROP_CALL_TASK':
            return action.id
        default:
            return state
    }
}