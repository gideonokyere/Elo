
export const newVisit = (state=0,action)=>{
   switch(action.type){
       case 'NEW_VISIT':
           return action.id
       default:
           return state
   }
}


export const listVisits=(state=[],action)=>{
   switch(action.type){
       case 'LIST_VISITS':
           return action.visits
       default:
           return state
   }
}

export const markVisitDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_VISIT_DONE':
            return action.id
        default:
            return state
    }
}

export const markVisitUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_VISIT_UNDONE':
            return action.id
        default:
            return state
    }
}