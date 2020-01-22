 
 //fetching calls task reducer
 export function listCalls(state=[],action){
     switch(action.type){
         case 'LIST_CALLS':
             return action.calls
         default:
             return state;
     }
 }

 //fetching tomorrow call task reducer
 export function listTomorrowCalls(state=[],action){
     switch(action.type){
         case 'LIST_TOMORROW_CALLS':
             return action.tomorrowcalls
        default:
            return state;
     }
 }

 //adding new call reducer
 export function newCall(state=0,action){
     switch(action.type){
        case 'NEW_CALL':
            return action.id
        default:
           return state
     }
 }

 //adding new call for tomorrow
 export function newCallTomorrow(state=0,action){
     switch(action.type){
         case 'NEW_TOMORROW_CALL':
             return action.id
        default:
            return state
     }
 }

 export const markCallDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_CALL_DONE':
            return action.id
        default:
            return state
    }
 }

 export const markCallUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_CALL_UNDONE':
            return action.id
        default:
            return state
    }
 }

 export const deleteCall=(state=0,action)=>{
     switch(action.type){
         case 'DELETE_CALL':
             return action.id
        default:
            return state
     }
 }