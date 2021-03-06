
export const newStudy=(state=0,action)=>{
   switch(action.type){
       case 'NEW_STUDY':
           return action.id
       default:
           return state
   }
}

export const newTomorrowStudy=(state=0,action)=>{
    switch(action.type){
        case 'NEW_TOMORROW_STUDY':
            return action.id
        default:
            return state
    }
}

export const listStudys=(state=[],action)=>{
    switch(action.type){
        case 'LIST_STUDYS':
            return action.studys
        default:
            return state
    }
}

export const listTomorrowStudys=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TOMORROW_STUDYS':
            return action.studies
        default:
            return state
    }
}

export const markStudyDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_STUDY_DONE':
            return action.id
        default:
            return state
    }
}

export const markStudyUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_STUDY_UNDONE':
            return action.id
        default:
            return state
    }
}

export const deleteStudy=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_STUDY':
            return action.id
        default:
            return state
    }
}

export const listDoneStudy=(state=[],action)=>{
   switch(action.type){
       case 'LIST_DONE_STUDY':
           return action.doneStudy
        default:
            return state
   }
}

export const dropStudy=(state=0,action)=>{
    switch(action.type){
        case 'DROP_STUDY':
            return action.id
        default:
            return state
    }
}

export const undropStudy=(state=0,action)=>{
    switch(action.type){
        case 'UNDROP_STUDY':
            return action.id
        default:
            return state
    }
}

export const addStudyByDate=(state=0,action)=>{
    switch(action.type){
        case 'ADD_STUDY_BY_DATE':
            return action.id
        default:
            return state
    }
}

export const listStudyByDate=(state=[],action)=>{
    switch(action.type){
        case 'LIST_STUDY_BY_DATE':
            return action.studydates
        default:
            return state
    }
}