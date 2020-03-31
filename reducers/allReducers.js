import {combineReducers} from 'redux';
import {newCall,newCallTomorrow,listCalls,listTomorrowCalls,markCallDone,markCallUndone,deleteCall,listCallDone,dropCall,undropCall,addCallByDate,listDateCall} from '../reducers/callReducer';
import {newTodo,newTodosTomorrow,listTodosTomorrow,listTodos,markTodoDone,markTodoUndone,deleteTodo,listDoneTodo,dropTodo,undropTodo,addTodoByDate,listTodoByDate} from '../reducers/todoReducer';
import {newGoto,newGotoTomorrow,listGotos,listGotosTomorrow,markGotoDone,markGotoUndone,deleteGoto,listDoneGoto,dropGoto,undropGoto,addGotoByDate,listGotoByDate} from '../reducers/gotoReducer';
import {newBuy,newTomorrowBuy,listBuys,listTomorrowBuy,markBuyDone,markBuyUndone,deleteBuy,listDoneBuy,dropBuy,undropBuy,addBuyByDate,listBuyByDate} from '../reducers/buyReducer';
import {newVisit,newTomorrowVisit,listVisits,listTomorrowVisit,markVisitDone,markVisitUndone,deleteVisit,listDoneVisit,dropVisit,undropVisit,addVisitByDate,listVisitByDate} from '../reducers/visitReducer';
import {newStudy,newTomorrowStudy,listStudys,listTomorrowStudys,markStudyDone,markStudyUndone,deleteStudy,listDoneStudy,addStudyByDate,listStudyByDate} from '../reducers/studyReducer';
import {newProject,newTomorrowProject,listProjects,listTomorrowProjects,markProjectDone,markProjectUndone,deleteProject,listDoneProject,addProjectByDate,listProjectByDate} from '../reducers/projectReducer';
import {newDaily,listDailys,markDailyDone,markDailyUndone,deleteDaily,listDoneDaily,dropCallTask,undropCallTask} from '../reducers/dailyReducer';

export default combineReducers({
    newCall,
    newCallTomorrow,
    listCalls,
    listTomorrowCalls,
    markCallDone,
    markCallUndone,
    deleteCall,
    listCallDone,
    dropCall,
    undropCall,
    addCallByDate,
    listDateCall,
    newTodo,
    newTodosTomorrow,
    listTodos,
    listTodosTomorrow,
    markTodoDone,
    markTodoUndone,
    deleteTodo,
    listDoneTodo,
    dropTodo,
    addTodoByDate,
    listTodoByDate,
    newGoto,
    newGotoTomorrow,
    listGotos,
    listGotosTomorrow,
    markGotoDone,
    markGotoUndone,
    deleteGoto,
    listDoneGoto,
    dropGoto,
    undropGoto,
    addGotoByDate,
    listGotoByDate,
    newBuy,
    newTomorrowBuy,
    listBuys,
    listTomorrowBuy,
    markBuyDone,
    markBuyUndone,
    deleteBuy,
    listDoneBuy,
    dropBuy,
    undropBuy,
    addBuyByDate,
    listBuyByDate,
    newVisit,
    newTomorrowVisit,
    listVisits,
    listTomorrowVisit,
    markVisitDone,
    markVisitUndone,
    deleteVisit,
    listDoneVisit,
    dropVisit,
    undropVisit,
    addVisitByDate,
    listVisitByDate,
    newStudy,
    newTomorrowStudy,
    listStudys,
    deleteStudy,
    listTomorrowStudys,
    markStudyDone,
    markStudyUndone,
    listDoneStudy,
    addStudyByDate,
    listStudyByDate,
    newProject,
    newTomorrowProject,
    listProjects,
    listTomorrowProjects,
    markProjectDone,
    markProjectUndone,
    deleteProject,
    listDoneProject,
    addProjectByDate,
    listProjectByDate,
    newDaily,
    listDailys,
    markDailyDone,
    markDailyUndone,
    deleteDaily,
    listDoneDaily,
    dropCallTask,
    undropCallTask
});