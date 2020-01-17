import DB,{createGotoTable} from '../DB/DB';
import moment from 'moment';


export const newGoto = (id)=>{
    return{
       type:'NEW_GOTO',
       id
    }
}

export const newGotoTomorrow=(id)=>{
   return{
      type:'NEW_GOTO_TOMORROW',
      id
   }
}

export const listGotos =(gotos)=>{
   return{
       type:'LIST_GOTOS',
       gotos
   }
}

export const listGotosTomorrow=(gotos_tomorrow)=>{
   return{
      type:'LIST_GOTOS_TOMORROW',
      gotos_tomorrow
   }
}

export const markGotoDone=(id)=>{
   return{
      type:'MARK_GOTO_DONE',
      id
   }
}

export const markGotoUndone=(id)=>{
   return{
      type:'MARK_GOTO_UNDONE',
      id
   }
}

//action creators//
export const addGoto=(goto)=>{
    createGotoTable();
    return (despatch)=>{
        const date = moment(Date.now()).format('YYYY-MM-DD');
        DB.transaction((tx)=>{
           tx.executeSql(`insert into gotos (goto,done,date) values (?,?,?)`,[goto,0,date],(tx,res)=>{
               despatch(newGoto(res.insertId));
           });
        });
    }
}

export const addGotoTomorrow=(goto)=>{
   createGotoTable();
   return (despatch)=>{
      const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
      DB.transaction((tx)=>{
         tx.executeSql(`insert into gotos (goto,done,date) values (?,?,?)`,[goto,0,date],(tx,res)=>{
            despatch(newGotoTomorrow(res.insertId));
         });
      });
   }
}

export const fetchGoto=()=>{
   return (despatch)=>{
      DB.transaction((tx)=>{
         tx.executeSql(`select * from gotos`,[],(tx,res)=>{
            despatch(listGotos(res.rows._array));
         })
      });
   }
}

export const fetchGotoTomorrow=()=>{
   createGotoTable();
   return (despatch)=>{
      const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
      DB.transaction((tx)=>{
         tx.executeSql(`select * from gotos where date=?`,[date],(tx,res)=>{
            despatch(listGotosTomorrow(res.rows._array));
         });
      });
   }
}

export const checkedGoToDone=(id)=>{
   return (despatch)=>{
      DB.transaction((tx)=>{
         tx.executeSql(`update gotos set done=? where id=?`,[1,id],(tx,res)=>{
            despatch(markGotoDone(res.rowsAffected));
         });
      });
   }
}

export const checkedGotoUndone=(id)=>{
   return (despatch)=>{
      DB.transaction((tx)=>{
         tx.executeSql(`update gotos set done=? where id=?`,[0,id],(tx,res)=>{
            despatch(markGotoUndone(res.rowsAffected));
         });
      });
   }
}


