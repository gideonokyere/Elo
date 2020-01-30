import DB,{createVisitTable} from '../DB/DB';
import moment from 'moment';


const listVisits = (visits)=>{
    return{
        type:'LIST_VISITS',
        visits
    }
}

const listTomorrowVisits=(tomorrow_visits)=>{
    return{
        type:'LIST_TOMORROW_VISITS',
        tomorrow_visits
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

export const listDoneVisit=(doneVisits)=>{
    return{
        type:'LIST_DONE_VISIT',
        doneVisits
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

export const addTomorrowVisit=(visit)=>{
    createVisitTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        console.log('Visit triggerd');
        DB.transaction((tx)=>{
            tx.executeSql(`insert into visits (visit,done,date) values (?,?,?)`,[visit,0,date],(tx,res)=>{
                despatch(()=>{
                    return{
                        type:'NEW_TOMORROW_VISIT',
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
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql(`select * from visits where date<? and done=?`,[date,0],(tx,res)=>{
               despatch(listVisits(res.rows._array));
           });
       });
    }
}


export const fetchTomorrowData=()=>{
    createVisitTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`select * from visits where date=?`,[date],(tx,res)=>{
                despatch(listTomorrowVisits(res.rows._array));
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

export const deleteVisit=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`delete from visits where id=?`,[id],(tx,res)=>{
                despatch(()=>{
                    return{
                        type:'DELETE_VISIT',
                        id:res.rows.item.length
                    }
                });
            });
        });
    }
}

export const fetchDoneVisit=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from visits where done=?`,[1],(tx,res)=>{
                despatch(listDoneVisit(res.rows._array));
            });
        });
    }
}