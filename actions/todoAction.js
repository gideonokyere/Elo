import moment from 'moment';
import DB from '../DB/DB';
import {createTodoTable} from '../DB/DB';

export const newTodo=(id)=>{
  return{
      type:'ADD_TODO',
      id
  }
}

export const listTodos=(todos)=>{
   return{
       type:'LIST_TODOS',
       todos
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

export const fetchTodos =()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
          tx.executeSql(`select * from todos`,[],(tx,res)=>{
            despatch(listTodos(res.rows._array));
            //console.log(res.rows._array);
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
        console.log('Click UNTODO');
      });
    });
  }
}






