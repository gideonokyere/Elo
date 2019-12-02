import moment from 'moment';
import DB from '../DB/DB'
import {createCallTable} from '../DB/DB'


export const newCall =(id)=>{
    return{
        type:'NEW_CALL',
        id
    }
}


export const listCalls =(calls)=>{
    return {
        type:'LIST_CALLS',
        calls
    }
}

/*** Action Creators */

//inserting new call task to db
export const addCall = (name)=>{
    createCallTable();
      return (despatch)=>{
       const date = moment(Date.now()).format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql("insert into calls (name,done,date) values (?,?,?)",[name,0,date],(tx,res)=>{
              despatch(newCall(res.insertId));
           });
       });
    }
}

//listing all calls
export const fetchCalls=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from calls`,[],(tx,res)=>{
                despatch(listCalls(res.rows._array));
            })
        });
    }
}