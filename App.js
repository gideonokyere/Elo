
import React from 'react';
import NavigationService from './utilis/NavigationService';
import HomeScreen from './components/NavBar';




const App = () => {
  return (
    <HomeScreen
      ref={navigatorRef => {
      NavigationService.setTopLevelNavigator(navigatorRef);
    }}
    />
  );
};


export default App;
