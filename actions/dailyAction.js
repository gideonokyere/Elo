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


