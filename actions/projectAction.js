import moment from 'moment';
import DB,{createProjectTable} from '../DB/DB';

export const newProject=(id)=>{
    return{
        type:'NEW_PROJECT',
        id
    }
}

export const newTomorrowProject=(id)=>{
    return{
        type:'NEW_TOMORROW_PROJECT',
        id
    }
}

export const listProjects=(projects)=>{
    return {
        type:'LIST_PROJECTS',
        projects
    }
}

export const listTomorrowProject=(tomorrow_projects)=>{
   return{
       type:'LIST_TOMORROW_PROJECTS',
       tomorrow_projects
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

export const listDoneProject=(doneProject)=>{
    return{
        type:'LIST_DONE_PROJECT',
        doneProject
    }
}

export const dropProject=(id)=>{
    return{
        type:'DROP_PROJECT',
        id
    }
}

export const undropProject=(id)=>{
    return{
        type:'UNDROP_PROJECT',
        id
    }
}

export const addProjectByDate=(id)=>{
    return{
        type:'ADD_PROJECT_BY_DATE',
        id
    }
}

export const listProjectByDate=(projectdates)=>{
    return{
        type:'LIST_PROJECT_BY_DATE',
        projectdates
    }
}

/***************************************************************************************************************/
/************************************************ Action Creators **********************************************/


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

//adding projects at any date
export const addProjectByDates=(project,date)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`insert into projects (project,done,date) values (?,?,?)`,[project,0,date],(tx,res)=>{
                console.log(res.insertId);
                despatch(addProjectByDate(res.insertId));
            });
        });
    }
}

export const addTomorrowProject=(project)=>{
    createProjectTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`insert into projects (project,done,date) values (?,?,?)`,[project,0,date],(tx,res)=>{
                despatch(newTomorrowProject(res.rows._array));
            });
        });
    }
}

export const fetchData=()=>{
    createProjectTable();
   return (despatch)=>{
    const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
       DB.transaction((tx)=>{
          tx.executeSql(`select * from projects where date<? and done=?`,[date,0],(tx,res)=>{
              despatch(listProjects(res.rows._array));
          });
       });
   }
}

//listing projects > today
export const listProjectByDates=()=>{
    createProjectTable();
    return (despatch)=>{
        //console.log("Loading Data....");
        const date = moment(Date.now()).format("YYYY-MM-DD");
        DB.transaction((tx)=>{
            tx.executeSql(`select * from projects where date>? and done=?`,[date,0],(tx,res)=>{
                despatch(listProjectByDate(res.rows._array));
            });
        });
    }
}

export const fetchTomorrowData=()=>{
    createProjectTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
          tx.executeSql(`select * from projects where date=?`,[date],(tx,res)=>{
              despatch(listTomorrowProject(res.rows._array));
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

export const deleteProject=(id)=>{
    return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`delete from projects where id=?`,[id],(tx,res)=>{
               despatch(()=>{
                   return{
                       type:'DELETE_PROJECT',
                       id:res.rows.item.length
                   }
               });
           });
       });
    }
}

export const fetchDoneProject=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from projects where done=?`,[1],(tx,res)=>{
                despatch(listDoneProject(res.rows._array));
            });
        });
    }
}

export const projectDrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update projects set done=? where id=?`,[2,id],(tx,res)=>{
                despatch(dropProject(res.rowsAffected));
            });
        });
    }
}

export const projectUndrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update projects set done=? where id=?`,[0,id],(tx,res)=>{
                despatch(undropProject(res.rowsAffected));
            });
        });
    }
}