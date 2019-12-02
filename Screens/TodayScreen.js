import React from 'react';
import {Text,ScrollView,KeyboardAvoidingView} from 'react-native';
import Constainer from '../components/Constainer';
import Add from '../components/Add'
import Accordian from '../components/Accordian';

import DailyScreen from '../Screens/DailyScreen';
import AddCallScreen from '../Screens/AddCallScreen';
import ToDoScreen from '../Screens/ToDoScreen';
import GoToScreen from '../Screens/GoToScreen';
import BuyScreen from '../Screens/BuyScreen';
import VisitScreen from '../Screens/VisitScreen';
import StudyScreen from '../Screens/StudyScreen';
import ProjectScreen from '../Screens/ProjectScreen';

const TodayScreen = ()=>{
    return(
       <Constainer>
         <Text>Today</Text>
      <ScrollView>
         <Accordian title='Daily'>
            <DailyScreen/>
         </Accordian>

         <Accordian title='Call'>
            <AddCallScreen/>
         </Accordian>

         <Accordian title='To Do'>
            <ToDoScreen/>
         </Accordian>

         <Accordian title='Go To'>
            <GoToScreen/>
         </Accordian>

         <Accordian title='Buy'>
            <BuyScreen/>
         </Accordian>

         <Accordian title='Visit'>
            <VisitScreen/>
         </Accordian>

         <Accordian title='Study'>
            <StudyScreen/>
         </Accordian>

         <Accordian title='Projects'>
            <ProjectScreen/>
         </Accordian>
      </ScrollView>

       </Constainer>
    );
}

export default TodayScreen;