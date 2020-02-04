
export const newVisit = (state=0,action)=>{
   switch(action.type){
       case 'NEW_VISIT':
           return action.id
       default:
           return state
   }
}

export const newTomorrowVisit=(state=0,action)=>{
    switch(action.type){
        case 'NEW_TOMORROW_VISIT':
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

export const listTomorrowVisit=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TOMORROW_VISITS':
            return action.tomorrow_visits
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

export const deleteVisit=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_VISIT':
            return action.id
        default:
            return state
    }
}

export const listDoneVisit=(state=[],action)=>{
    switch(action.type){
        case 'LIST_DONE_VISIT':
            return action.doneVisits
        default:
            return state
    }
}

export const dropVisit=(state=0,action)=>{
    switch(action.type){
        case 'DROP_VISIT':
            return action.id
        default:
            return state
    }
}

export const undropVisit=(state=0,action)=>{
    switch(action.type){
        case 'UNDROP_VISIT':
            return action.id
        default:
            return state
    }
}