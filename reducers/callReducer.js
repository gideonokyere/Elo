 
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

 export const listCallDone=(state=[],action)=>{
    switch(action.type){
        case 'LIST_CALL_DONE':
            return action.callDones
        default:
            return state
    }
 }

 export const dropCall=(state=0,action)=>{
     switch(action.type){
         case 'DROP_CALL':
             return action.id
        default:
            return state

     }
 }

 export const undropCall=(state=0,action)=>{
     switch(action.type){
         case 'UNDROP_CALL':
             return action.id
        default:
            return state
     }
 }

 export const addCallByDate=(state=0,action)=>{
     switch(action.type){
         case 'ADD_CALL_BY_DATE':
             return action.id
        default:
            return state
     }
 }

 export const listDateCall=(state=[],action)=>{
     switch(action.type){
         case 'DATECALLS':
             return action.datecalls
        default:
            return state
     }
 }