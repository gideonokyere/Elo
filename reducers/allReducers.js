import {combineReducers} from 'redux';
import {newCall,listCalls} from '../reducers/callReducer';
import {newTodo,listTodos} from '../reducers/todoReducer';
import {newGoto,listGotos} from '../reducers/gotoReducer';
import {newBuy,listBuys} from '../reducers/buyReducer';
import {newVisit,listVisits} from '../reducers/visitReducer';
import {newStudy,listStudys} from '../reducers/studyReducer';
import {newProject,listProjects} from '../reducers/projectReducer';
import {newDaily,listDailys,markDailyDone,markDailyUndone} from '../reducers/dailyReducer';

export default combineReducers({
    newCall,
    listCalls,
    newTodo,
    listTodos,
    newGoto,
    listGotos,
    newBuy,
    listBuys,
    newVisit,
    listVisits,
    newStudy,
    listStudys,
    newProject,
    listProjects,
    newDaily,
    listDailys,
    markDailyDone,
    markDailyUndone
});