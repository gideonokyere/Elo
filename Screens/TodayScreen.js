import React from 'react';
import {ScrollView,KeyboardAvoidingView} from 'react-native';
import {Icon} from 'react-native-elements';
import Color from '../utilis/colors';
import Constainer from '../components/Constainer';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';

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
      <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
       <Constainer>
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
         
         <CompleteTask/>
      </ScrollView>

       </Constainer>
       </KeyboardAvoidingView>
    );
}

export default TodayScreen;
