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

//action creators

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
    return (despatch)=>{
       DB.transaction((tx)=>{
          tx.executeSql(`select * from  dailys`,[],(tx,res)=>{
              despatch(listDailys(res.rows._array));
          });
       });
    }
}

//mark daily done
export const checkedDailyDone=(id)=>{
    return (despatch)=>{
     DB.transaction((tx)=>{
        tx.executeSql(`update dailys set done=? where id=?`,[1,id],(tx,res)=>{
           despatch(markDailyDone(res.rowsAffected));
        });
    });
  }
}

//unmark daily done
export const checkedDailyUndone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update dailys set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(markDailyUndone(res.rowsAffected));
            });
        });
    }
}


