import DB,{createBuyTable} from '../DB/DB'
import moment from 'moment';

export const newBuy =(id)=>{
   return{
       type:'ADD_BUY',
       id
   }
}

export const newTomorrowBuy=(id)=>{
    return{
        type:'NEW_TOMORROW_BUY',
        id
    }
}

export const listBuys=(buys)=>{
   return{
       type:'LIST_BUYS',
       buys
   }
}

export const listTomorrowBuys=(tomorrow_buy)=>{
    return{
        type:'LIST_TOMORROW_BUYS',
        tomorrow_buy
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

export const listDoneBuy=(doneBuys)=>{
    return {
        type:'LIST_DONE_BUY',
        doneBuys
    }
}

export const dropBuy=(id)=>{
    return{
        type:'DROP_BUY',
        id
    }
}

export const undropBuy=(id)=>{
    return{
        type:'UNDROP_BUY',
        id
    }
}

/*************************************************************************************************************/
/**************************************** Action Creators *****************************************************/

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

export const addTomorrowBuy=(buy)=>{
    createBuyTable();
    return (despatch)=>{
    DB.transaction((tx)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        tx.executeSql(`insert into buys (buy,done,date) values (?,?,?)`,[buy,0,date],(tx,res)=>{
            despatch(newTomorrowBuy(res.insertId));
        });
    });
 }

}

//listing all buy list
export const fetchData=()=>{
   createBuyTable();
   return (despatch)=>{
       const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql(`select * from buys where id<? and done=?`,[date,0],(tx,res)=>{
               despatch(listBuys(res.rows._array));
           });
       });
   }
}

export const fetchTomorrowData=()=>{
   return (despatch)=>{
       DB.transaction((tx)=>{
           const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
           tx.executeSql(`select * from buys where date=?`,[date],(tx,res)=>{
               despatch(listTomorrowBuys(res.rows._array));
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

export const deleteBuy=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`delete from buys where id=?`,[id],(tx,res)=>{
                despatch(()=>{
                    return{
                        type:'DELETE_BUY',
                        id:res.rows.item.length
                    }
                });
            });
        });
    }
}

export const fetchDoneBuy=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from buys where done>?`,[0],(tx,res)=>{
                despatch(listDoneBuy(res.rows._array));
            });
        });
    }
}

export const buyDrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update buys set done=? where id=?`,[2,id],(tx,res)=>{
                despatch(dropBuy(res.rowsAffected));
            });
        });
    }
}

export const buyUndrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update buys set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(undropBuy(res.rowsAffected));
            });
        });
    }
}