import DB,{createVisitTable} from '../DB/DB';
import moment from 'moment';


const listVisits = (visits)=>{
    return{
        type:'LIST_VISITS',
        visits
    }
}

export const markVisitDone=(id)=>{
    return{
        type:'MARK_VISIT_DONE',
        id
    }
}

export const markVisitUndone=(id)=>{
    return{
        type:'MARK_VISIT_UNDONE',
        id
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

export const checkedVisitDone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update visits set done=? where id=?`,[1,id],(tx,res)=>{
                despatch(markVisitDone(res.rowsAffected));
            });
        });
    }
}

export const checkedVisitUndone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update visits set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(markVisitUndone(res.rowsAffected));
            });
        });
    }
}
