import DB,{createVisitTable} from '../DB/DB';
import moment from 'moment';


const listVisits = (visits)=>{
    return{
        type:'LIST_VISITS',
        visits
    }
}

// creating visit
export const addVisit =(visit)=>{
   createVisitTable();
   return (despatch)=>{
       const date = moment(Date.now()).format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql(`insert into visits (visit,done,date) values (?,?,?)`,[visit,0,date],(tx,res)=>{
                despatch(()=>{
                    return{
                        type:'NEW_VISIT',
                        id:res.insertId
                    }
                });
           });
       });
   }
}


//listing visit
export const fetchData = ()=>{
    createVisitTable();
    return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`select * from visits`,[],(tx,res)=>{
               despatch(listVisits(res.rows._array));
           });
       });
    }
} 
