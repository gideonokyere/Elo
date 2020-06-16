import React from 'react';
import {ScrollView,KeyboardAvoidingView,Platform} from 'react-native';
import Constainer from '../components/Constainer';


import DailyScreen from '../Screens/DailyScreen';
import AddCallScreen from '../Screens/AddCallScreen';
import ToDoScreen from '../Screens/ToDoScreen';
import GoToScreen from '../Screens/GoToScreen';
import BuyScreen from '../Screens/BuyScreen';
import VisitScreen from '../Screens/VisitScreen';
import StudyScreen from '../Screens/StudyScreen';
import ProjectScreen from '../Screens/ProjectScreen';

import CallComplete from './CallComplete';

const TodayScreen = ()=>{
    return(
       <Constainer>
      <ScrollView>
      <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={{flex:1}}>
          <DailyScreen/>

          <AddCallScreen/>
         
          <ToDoScreen/>

          <GoToScreen/>

         <BuyScreen/>

         <VisitScreen/>
        
         <StudyScreen/>

         <ProjectScreen/>
         </KeyboardAvoidingView>
      </ScrollView>

       </Constainer>
    );
}

export default TodayScreen;
