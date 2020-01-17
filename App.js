
import React from 'react';
import NavigationService from './utilis/NavigationService';
import HomeScreen from './components/NavBar'
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import allReducer from './reducers/allReducers';

const store = createStore(allReducer,initialState={},applyMiddleware(thunk));


const App = () => {
  return (
    <Provider store={store}>
    <HomeScreen
      ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
    />
    </Provider>
  );
};


export default App;
