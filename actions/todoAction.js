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

export const addTodo=(todo)=>{
   createTodoTable();
   return (despatch)=>{
    const date = moment(Date.now()).format('YYYY-MM_DD');
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
          });
        });
    }
}







