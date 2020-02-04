import moment from 'moment';
import DB from '../DB/DB';
import {createTodoTable} from '../DB/DB';

export const newTodo=(id)=>{
  return{
      type:'ADD_TODO',
      id
  }
}

export const newTodoTomorrow=(id)=>{
  return{
    type:'ADD_TODO_TOMORROW',
    id
  }
}


export const listTodos=(todos)=>{
   return{
       type:'LIST_TODOS',
       todos
   }
}


export const listTodosTomorrow=(todos_tomorrow)=>{
  return{
    type:'LIST_TODOS_TOMORROW',
    todos_tomorrow
  }
}

export const markTodoDone=(id)=>{
  return{
    type:'MARK_TODO_DONE',
    id
  }
}

export const markTodoUndone=(id)=>{
   return{
     type:'MARK_TODO_UNDONE',
     id
   }
}

export const listDoneTodo=(donetodos)=>{
  return{
    type:'FETCH_TODO_DONE',
    donetodos
  }
}

export const dropTodo=(id)=>{
  return{
    type:'DROP_TODO',
    id
  }
}

export const undropTodo=(id)=>{
  return{
    type:'UNDROP_TODO',
    id
  }
}

/****************************************************************************************************************/

/*********************************************** Action Creators ************************************************/

export const addTodo=(todo)=>{
   createTodoTable();
   return (despatch)=>{
    const date = moment(Date.now()).format('YYYY-MM-DD');
      DB.transaction((tx)=>{
          tx.executeSql(`insert into todos (todo,done,date) values (?,?,?)`,[todo,0,date],(tx,res)=>{
              despatch(newTodo(res.insertId));
          });
      });
   };
}

export const addTodoTomorrow=(todo)=>{
  createTodoTable();
  return (despatch)=>{
    const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
    DB.transaction((tx)=>{
       tx.executeSql(`insert into todos (todo,done,date) values (?,?,?)`,[todo,0,date],(tx,res)=>{
         despatch(newTodoTomorrow(res.insertId));
       });
    });
  }
}

export const fetchTodos =()=>{
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
          tx.executeSql(`select * from todos where date<? and done=?`,[date,0],(tx,res)=>{
            despatch(listTodos(res.rows._array));
          });
        });
    }
}

export const fetchTodosTomorrow=()=>{
  createTodoTable();
  return (despatch)=>{
     const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
     DB.transaction((tx)=>{
       tx.executeSql(`select * from todos where date=?`,[date],(tx,res)=>{
          despatch(listTodosTomorrow(res.rows._array));
       });
     });
  }
}

export const checkTodoDone=(id)=>{
  return function(despatch){
    DB.transaction((tx)=>{
      tx.executeSql(`update todos set done=? where id=?`,[1,id],(tx,res)=>{
        despatch(markTodoDone(res.rowsAffected));
      });
    });
  }
}


export const checkedTodoUndone=(id)=>{
  return (despatch)=>{
    DB.transaction((tx)=>{
      tx.executeSql(`update todos set done=? where id=?`,[0,id],(tx,res)=>{
        despatch(markTodoUndone(res.rowsAffected));
      });
    });
  }
}

export const deleteTodo=(id)=>{
  return (despatch)=>{
    DB.transaction((tx)=>{
      tx.executeSql(`delete from todos where id=?`,[id],(tx,res)=>{
        despatch(()=>{
          return{
            type:'DELETE_TODO',
            id:res.rows.item.length
          }
        });
      });
    });
  }
}

//fetching for completed todo tasks.
export const fetchDoneTodo=()=>{
  return (despatch)=>{
    DB.transaction((tx)=>{
      tx.executeSql(`select * from todos where done>?`,[0],(tx,res)=>{
        despatch(listDoneTodo(res.rows._array))
      });
    });
  }
}

export const todoDrop=(id)=>{
  return (despatch)=>{
    DB.transaction((tx)=>{
      tx.executeSql(`update todos set done=? where id=?`,[2,id],(tx,res)=>{
        despatch(dropTodo(res.rowsAffected));
      });
    });
  }
}

export const todoUndrop=(id)=>{
  return (despatch)=>{
    DB.transaction((tx)=>{
      tx.executeSql(`update todos set done=? where id=?`,[0,id],(tx,res)=>{
        despatch(todoUndrop(res.rowsAffected));
      });
    });
  }
}






