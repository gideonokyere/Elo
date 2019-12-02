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
       case 'MARK_DONE':
           return action.id
        default:
            return state
   }
}

export const markDailyUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_UNDONE':
            return action.id
        default:
            return state
    }
}