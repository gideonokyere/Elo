export const newStudy=(state=0,action)=>{
   switch(action.type){
       case 'NEW_STUDY':
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