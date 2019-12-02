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
