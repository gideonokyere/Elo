import moment from 'moment';
import DB from '../DB/DB'
import {createCallTable} from '../DB/DB'


export const newCall =(id)=>{
    return{
        type:'NEW_CALL',
        id
    }
}

export const newTomorrowCall =(id)=>{
    return{
        type:'NEW_TOMORROW_CALL',
        id
    }
}


export const listCalls =(calls)=>{
    return {
        type:'LIST_CALLS',
        calls
    }
}

export const listTomorrowCalls=(tomorrowcalls)=>{
    return{
        type:'LIST_TOMORROW_CALLS',
        tomorrowcalls
    }
}

export const markCallDone=(id)=>{
    return {
        type:'MARK_CALL_DONE',
        id
    }
}

export const markCallUndone=(id)=>{
    return {
        type:'MARK_CALL_UNDONE',
        id
    }
}


/*** Action Creators */

//inserting new call task to db
export const addCall = (name,number)=>{
    createCallTable();
      return (despatch)=>{
       const date = moment(Date.now()).format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql("insert into calls (name,number,done,date) values (?,?,?,?)",[name,number,0,date],(tx,res)=>{
              despatch(newCall(res.insertId));
           });
       });
    }
}

//inserting new call for tomorrow task
export const addCallTomorrow = (name,number)=>{
    createCallTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql("insert into calls (name,number,done,date) values (?,?,?,?)",[name,number,0,date],(tx,res)=>{
                despatch(newTomorrowCall(res.insertId));
            });
        });
    }
}

//listing all calls
export const fetchCalls=()=>{
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`select * from calls where date<?`,[date],(tx,res)=>{
                despatch(listCalls(res.rows._array));
            })
        });
    }
}

//listing all calls for tomorrow
export const fetchTomorrowCalls=()=>{
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`select * from calls where date=?`,[date],(tx,res)=>{
                //console.log(res.rows._array)
                despatch(listTomorrowCalls(res.rows._array));
            });
        });
    }
}


//checked call done
export const checkedCallDone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update calls set done=? where id=?`,[1,id],(tx,res)=>{
                despatch(markCallDone(res.rowsAffected));
            });
        });
    }
}

//checked call undone
export const checkedCallUndone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update calls set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(markCallUndone(res.rowsAffected));
            });
        });
    }
}

export const deleteCall=(id)=>{
    return (despatch)=>{

    DB.transaction((tx)=>{
        tx.executeSql(`delete from calls where id=?`,[id],(tx,res)=>{
            //console.log(res.rows.item.length);
            despatch(()=>{
                return{
                    type:'DELETE_CALL',
                    id:res.rows.item.length
                }
            });
        });
    });
   }
}