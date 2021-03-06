import moment from 'moment';
import DB,{createStudyTable} from '../DB/DB';

export const newStudy =(id)=>{
   return{
       type:'NEW_STUDY',
       id
   }
}

export const newTomorrowStudy=(id)=>{
    return{
        type:'NEW_TOMORROW_STUDY',
        id
    }
}

export const listStudys=(studys)=>{
    return{
        type:'LIST_STUDYS',
        studys
    }
}

export const listTomorrowStudy=(studies)=>{
    return{
        type:'LIST_TOMORROW_STUDYS',
        studies
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

export const listDoneStudy=(doneStudy)=>{
    return{
        type:'LIST_DONE_STUDY',
        doneStudy
    }
}

export const dropStudy=(id)=>{
    return{
        type:'DROP_STUDY',
        id
    }
}

export const undropStudy=(id)=>{
    return{
        type:'UNDROP_STUDY',
        id
    }
}

export const addStudyByDate=(id)=>{
    return{
        type:'ADD_STUDY_BY_DATE',
        id
    }
}

export const listStudyByDate=(studydates)=>{
    return{
        type:'LIST_STUDY_BY_DATE',
        studydates
    }
}

/**************************************************************************************************************/
/********************************************** Action Creators***********************************************/

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

//adding study at any date//
export const addStudyByDates=(study,date)=>{
    createStudyTable();
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`insert into studys (study,done,date) values (?,?,?)`,[study,0,date],(tx,res)=>{
                //console.log(res.insertId);
                despatch(addStudyByDate(res.insertId));
            });
        });
    }
}

export const addTomorrowStudy=(study)=>{
    createStudyTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`insert into studys (study,done,date) values (?,?,?)`,[study,0,date],(tx,res)=>{
                despatch(newTomorrowStudy(res.insertId));
            });
        });
    }
}

//listing studys
export const fetchData=()=>{
    createStudyTable();
    return (despatch)=>{
        const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
        DB.transaction((tx)=>{
            tx.executeSql(`select * from studys where date<? and done=?`,[date,0],(tx,res)=>{
                despatch(listStudys(res.rows._array));
            });
        });
    }
}

//listing study > today//
export const listStudyByDates=()=>{
    createStudyTable();
    return (despatch)=>{
        const date = moment(Date.now()).format("YYYY-MM-DD");
    DB.transaction((tx)=>{
        tx.executeSql(`select * from studys where date>? and done=?`,[date,0],(tx,res)=>{
            despatch(listStudyByDate(res.rows._array));
        });
    });
    }
}

export const fetchTomorrowData=()=>{
   createStudyTable();
   return (despatch)=>{
       const date = moment(Date.now()).add(1,'day').format('YYYY-MM-DD');
       DB.transaction((tx)=>{
           tx.executeSql(`select * from studys where date=?`,[date],(tx,res)=>{
                despatch(listTomorrowStudy(res.rows._array));
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

export const deleteStudy=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`delete from studys where id=?`,[id],(tx,res)=>{
                despatch(()=>{
                    return {
                        type:'DELETE_STUDY',
                        id:res.rows.item.length
                    }
                })
            })
        })
    }
}

export const fetchDoneStudy=()=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`select * from studys where done>?`,[0],(tx,res)=>{
                despatch(listDoneStudy(res.rows._array));
            });
        });
    }
}

export const studyDrop=(id)=>{
    return (despatch)=>{
        DB.transaction((tx)=>{
            tx.executeSql(`update studys set done=? where id=?`,[2,id],(tx,res)=>{
                despatch(dropStudy(res.rowsAffected));
            });
        });
    }
}

export const studyUndrop=(id)=>{
    return (despatch)=>{
       DB.transaction((tx)=>{
           tx.executeSql(`update studys set done=? where id=?`,[0,id],(tx,res)=>{
               despatch(undropStudy(res.rowsAffected));
           });
       });
    }
}