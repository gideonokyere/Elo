import React from 'react';
import {ScrollView,KeyboardAvoidingView} from 'react-native';
import Accordian from '../components/Accordian';
import Container from '../components/Constainer';

import CallNextDayScreen from '../Screens/AddCallNextdayScreen';
import TodosNextDayScreen from '../Screens/AddTodosNextdayScreen';
import AddGotoNextDayScreen from '../Screens/AddGotoNextdayScreen';
import AddBuyNextDayScreen from '../Screens/AddBuyNextdayScreen';
import AddVisitNextDayScreen from '../Screens/AddVisitNexdayScreen';
import AddStudyNextDayScreen from '../Screens/AddStudyNextdayScreen';
import AddProjectNextDayScreen from '../Screens/AddProjectNextdayScreen';

const TomorrowScreen =()=>{
    return(
        <KeyboardAvoidingView behavior='padding' style={{flex:1}}>
            <Container>
                
                <ScrollView>

                    <CallNextDayScreen/>

                    <TodosNextDayScreen/>

                    <AddGotoNextDayScreen/>

                    <AddBuyNextDayScreen/>

                    <AddVisitNextDayScreen/>

                    <AddStudyNextDayScreen/>

                    <AddProjectNextDayScreen/>

                </ScrollView>
                
            </Container>
        </KeyboardAvoidingView>
    );
}

export default TomorrowScreen;