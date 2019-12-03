import DB,{createBuyTable} from '../DB/DB'
import moment from 'moment';

export const newBuy =(id)=>{
   return{
       type:'ADD_BUY',
       id
   }
}

export const listBuys=(buys)=>{
   return{
       type:'LIST_BUYS',
       buys
   }
}

export const markBuyDone=(id)=>{
    return{
        type:'MARK_BUY_DONE',
        id
    }
}

export const markBuyUndone=(id)=>{
    return{
        type:'MARK_BUY_UNDONE',
        id
    }
}



//Acction creators

//adding to buy list
export const addBuy=(buy)=>{
    createBuyTable();
    return (despatch)=>{
        DB.transaction((tx)=>{
            const date = moment().format('YYYY-MM-DD');
            tx.executeSql(`insert into buys (buy,done,date) values (?,?,?)`,[buy,0,date],(tx,res)=>{
                despatch(newBuy(res.insertId));
            });
        });
    }
}


//listing all buy list
export const fetchData=(buys)=>{
   createBuyTable();
   return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`select * from buys`,[],(tx,res)=>{
               despatch(listBuys(res.rows._array));
           });
       });
   }
}

export const checkedBuyDone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update buys set done=? where id=?`,[1,id],(tx,res)=>{
                despatch(markBuyDone(res.rowsAffected));
            });
        });
    }
}

export const checkedBuyUndone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update buys set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(markBuyUndone(res.rowsAffected));
            });
        });
    }
}