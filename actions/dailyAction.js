import moment from 'moment';
import DB,{createDailyTable} from  '../DB/DB';


export const newDaily=(id)=>{
    return{
        type:'NEW_DAILY',
        id
    }
}

export const listDailys=(dailys)=>{
    return{
        type:'LIST_DAILYS',
        dailys
    }
}

export const markDailyDone=(id)=>{
   return {
       type:'MARK_DAILY_DONE',
       id
   }
}

export const markDailyUndone=(id)=>{
    return{
        type:'MARK_DAILY_UNDONE',
        id
    }
}

export const listDoneDaily=(doneDaily)=>{
    return{
        type:'LIST_DONE_DAILY',
        doneDaily
    }
}

export const dropCallTask=(id)=>{
    return{
        type:'DROP_CALL_TASK',
        id
    }
}

export const undropCallTask=(id)=>{
    return{
        type:'UNDROP_CALL_TASK',
        id
    }
}

/***************************************************************************************************** */

/**************************************** Action Creators **********************************************/

//adding new daily
export const addDaily=(daily)=>{
    createDailyTable();
    return (despatch)=>{
        const date = moment(Date.now()).format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`insert into dailys (daily,done,date) values (?,?,?)`,[daily,0,date],(tx,res)=>{
               despatch(newDaily(res.insertId));
            });
        });
    }
}

//listing daily
export const fetchData=()=>{
    createDailyTable();
    resetDaily();
    return (despatch)=>{
       DB.transaction((tx)=>{
          tx.executeSql(`select * from  dailys where done=?`,[0],(tx,res)=>{
              despatch(listDailys(res.rows._array));
          });
       });
    }
}

//mark daily done
export const checkedDailyDone=(id)=>{
    return (despatch)=>{
     const date = moment(Date.now()).format('YYYY-MM-DD') 
     DB.transaction((tx)=>{
        tx.executeSql(`update dailys set done=?,date=? where id=?`,[1,date,id],(tx,res)=>{
           despatch(markDailyDone(res.rowsAffected));
        });
    });
  }
}

//unmark daily done
export const checkedDailyUndone=(id)=>{
    return (despatch)=>{
        const date = moment(Date.now()).format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`update dailys set done=?,date=? where id=?`,[0,date,id],(tx,res)=>{
                despatch(markDailyUndone(res.rowsAffected));
            });
        });
    }
}

export const deleteDaily=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`delete from dailys where id=?`,[id],(tx,res)=>{
                despatch(()=>{
                    return{
                        type:'DELETE_DAILY',
                        id:res.rows.item.length
                    }
                });
            });
        });
    }
}

export const resetDaily=()=>{
    DB.transaction((tx)=>{
        let date = moment(Date.now()).format('YYYY-MM-DD');
        tx.executeSql(`select * from dailys where date<? and done=?`,[date,1],(tx,res)=>{
            //console.log(res.rows._array);
            if(!res) return;
            let list =res.rows._array;
            list.forEach((l)=>{
                tx.executeSql(`update dailys set done=? where id=?`,[0,l.id],(tx,res)=>{
                    return res.rowsAffected;
                })
            })
        })
    })
}

export const fetchDoneDaily=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from dailys where done>?`,[0],(tx,res)=>{
                despatch(listDoneDaily(res.rows._array));
            });
        });
    }
}

export const callTaskDrop=(id)=>{
   return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`update dailys set done=? where id=?`,[3,id],(tx,res)=>{
               despatch(dropCallTask(res.rowsAffected));
           });
       });
   }
}

export const callTaskUndrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update dailys set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(undropCallTask(res.rowsAffected));
            });
        });
    }
}


