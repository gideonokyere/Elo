import moment from 'moment';
import DB,{createStudyTable} from '../DB/DB';

export const newStudy =(id)=>{
   return{
       type:'NEW_STUDY',
       id
   }
}

export const listStudys=(studys)=>{
    return{
        type:'LIST_STUDYS',
        studys
    }
}

export const markStudyDone=(id)=>{
    return{
        type:'MARK_STUDY_DONE',
        id
    }
}

export const markStudyUndone=(id)=>{
   return{
       type:'MARK_STUDY_UNDONE',
       id
   }
}

//creating action creators

//adding new study
export const addStudy=(study)=>{
   createStudyTable();
   return (despatch)=>{
       const date = moment(Date.now()).format('YYYY-MM-DD');
       DB.transaction((tx)=>{
          tx.executeSql('insert into studys (study,done,date) values (?,?,?)',[study,0,date],(tx,res)=>{
            despatch(newStudy(res.insertId));
          });
       });
   }
}

//listing studys
export const fetchData=()=>{
    createStudyTable();
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from studys`,[],(tx,res)=>{
                despatch(listStudys(res.rows._array));
            });
        });
    }
}

export const checkedStudyDone=(id)=>{
    return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`update studys set done=? where id=?`,[1,id],(tx,res)=>{
               despatch(markStudyDone(res.rowsAffected));
           });
       });
    }
}

export const checkedStudyUndone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update studys set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(markStudyUndone(res.rowsAffected));
            });
        });
    }
}
