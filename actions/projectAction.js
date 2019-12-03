import moment from 'moment';
import DB,{createProjectTable} from '../DB/DB';

export const newProject=(id)=>{
    return{
        type:'NEW_PROJECT',
        id
    }
}

export const listProjects=(projects)=>{
    return {
        type:'LIST_PROJECTS',
        projects
    }
}

export const markProjectDone=(id)=>{
    return{
        type:'MARK_PROJECT_DONE',
        id
    }
}

export const markProjectUndone=(id)=>{
    return{
        type:'MARK_PROJECT_UNDONE',
        id
    }
}


//action creators

//adding project
export const addProject=(project)=>{
   createProjectTable();
   return (despatch)=>{
       const date = moment(Date.now()).format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql(`insert into projects (project,done,date) values (?,?,?)`,[project,0,date],(tx,res)=>{
              despatch(newProject(res.insertId));
           });
       });
   }
}

export const fetchData=()=>{
    createProjectTable();
   return (despatch)=>{
       DB.transaction((tx)=>{
          tx.executeSql(`select * from projects`,[],(tx,res)=>{
              despatch(listProjects(res.rows._array));
          });
       });
   }
}

export const checkedProjectDone=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update projects set done=? where id=?`,[1,id],(tx,res)=>{
                despatch(markProjectDone(res.rowsAffected));
            });
        });
    }
}

export const checkedProjectUndone=(id)=>{
    return (despatch)=>{
    DB.transaction((tx)=>{
        tx.executeSql(`update projects set done=? where id=?`,[0,id],(tx,res)=>{
            despatch(markProjectUndone(res.rowsAffected));
        });
    });
 }
}
