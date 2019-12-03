import {combineReducers} from 'redux';
import {newCall,listCalls,markCallDone,markCallUndone} from '../reducers/callReducer';
import {newTodo,listTodos,markTodoDone,markTodoUndone} from '../reducers/todoReducer';
import {newGoto,listGotos,markGotoDone,markGotoUndone} from '../reducers/gotoReducer';
import {newBuy,listBuys,markBuyDone,markBuyUndone} from '../reducers/buyReducer';
import {newVisit,listVisits,markVisitDone,markVisitUndone} from '../reducers/visitReducer';
import {newStudy,listStudys,markStudyDone,markStudyUndone} from '../reducers/studyReducer';
import {newProject,listProjects,markProjectDone,markProjectUndone} from '../reducers/projectReducer';
import {newDaily,listDailys,markDailyDone,markDailyUndone} from '../reducers/dailyReducer';

export default combineReducers({
    newCall,
    listCalls,
    markCallDone,
    markCallUndone,
    newTodo,
    listTodos,
    markTodoDone,
    markTodoUndone,
    newGoto,
    listGotos,
    markGotoDone,
    markGotoUndone,
    newBuy,
    listBuys,
    markBuyDone,
    markBuyUndone,
    newVisit,
    listVisits,
    markVisitDone,
    markVisitUndone,
    newStudy,
    listStudys,
    markStudyDone,
    markStudyUndone,
    newProject,
    listProjects,
    markProjectDone,
    markProjectUndone,
    newDaily,
    listDailys,
    markDailyDone,
    markDailyUndone
});