
export const newBuy=(state=0,action)=>{
    switch(action.type){
        case 'ADD_BUY':
            return action.id
        default:
            return state
    }
}

export const newTomorrowBuy=(state=0,action)=>{
    switch(action.type){
        case 'NEW_TOMORROW_BUY':
            return action.id
        default:
            return state
    }
}

export const listBuys=(state=[],action)=>{
    switch(action.type){
        case 'LIST_BUYS':
            return action.buys
        default:
            return state
    }
}

export const listTomorrowBuy=(state=[],action)=>{
    switch(action.type){
        case 'LIST_TOMORROW_BUYS':
            return action.tomorrow_buy
        default:
            return state
    }
}

export const markBuyDone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_BUY_DONE':
            return action.id
        default:
            return state
    }
}

export const markBuyUndone=(state=0,action)=>{
    switch(action.type){
        case 'MARK_BUY_UNDONE':
            return action.id
        default:
            return state
    }
}

export const deleteBuy=(state=0,action)=>{
    switch(action.type){
        case 'DELETE_BUY':
            return action.id
        default:
            return state
    }
}

export const listDoneBuy=(state=[],action)=>{
    switch(action.type){
        case 'LIST_DONE_BUY':
            return action.doneBuys
        default:
            return state
    }
}

export const dropBuy=(state=0,action)=>{
    switch(action.type){
        case 'DROP_BUY':
            return action.id
        default:
            return state
    }
}

export const undropBuy=(state=0,action)=>{
   switch(action.type){
       case 'UNDROP_BUY':
           return action.id
        default:
            return state
   }
}

export const addBuyByDate=(state=0,action)=>{
    switch(action.type){
        case 'ADD_BUY_BY_DATE':
            return action.id
        default:
            return state
    }
}

export const listBuyByDate=(state=[],action)=>{
    switch(action.type){
        case 'LIST_BUY_BY_DATE':
            return action.buydates
        default:
            return state
    }
}