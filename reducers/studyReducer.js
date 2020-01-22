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