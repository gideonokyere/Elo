import {combineReducers} from 'redux';
import {newCall,newCallTomorrow,listCalls,listTomorrowCalls,markCallDone,markCallUndone} from '../reducers/callReducer';
import {newTodo,newTodosTomorrow,listTodosTomorrow,listTodos,markTodoDone,markTodoUndone} from '../reducers/todoReducer';
import {newGoto,newGotoTomorrow,listGotos,listGotosTomorrow,markGotoDone,markGotoUndone} from '../reducers/gotoReducer';
import {newBuy,newTomorrowBuy,listBuys,listTomorrowBuy,markBuyDone,markBuyUndone} from '../reducers/buyReducer';
import {newVisit,newTomorrowVisit,listVisits,listTomorrowVisit,markVisitDone,markVisitUndone} from '../reducers/visitReducer';
import {newStudy,newTomorrowStudy,listStudys,listTomorrowStudys,markStudyDone,markStudyUndone} from '../reducers/studyReducer';
import {newProject,newTomorrowProject,listProjects,listTomorrowProjects,markProjectDone,markProjectUndone} from '../reducers/projectReducer';
import {newDaily,listDailys,markDailyDone,markDailyUndone} from '../reducers/dailyReducer';

export default combineReducers({
    newCall,
    newCallTomorrow,
    listCalls,
    listTomorrowCalls,
    markCallDone,
    markCallUndone,
    newTodo,
    newTodosTomorrow,
    listTodos,
    listTodosTomorrow,
    markTodoDone,
    markTodoUndone,
    newGoto,
    newGotoTomorrow,
    listGotos,
    listGotosTomorrow,
    markGotoDone,
    markGotoUndone,
    newBuy,
    newTomorrowBuy,
    listBuys,
    listTomorrowBuy,
    markBuyDone,
    markBuyUndone,
    newVisit,
    newTomorrowVisit,
    listVisits,
    listTomorrowVisit,
    markVisitDone,
    markVisitUndone,
    newStudy,
    newTomorrowStudy,
    listStudys,
    listTomorrowStudys,
    markStudyDone,
    markStudyUndone,
    newProject,
    newTomorrowProject,
    listProjects,
    listTomorrowProjects,
    markProjectDone,
    markProjectUndone,
    newDaily,
    listDailys,
    markDailyDone,
    markDailyUndone
});