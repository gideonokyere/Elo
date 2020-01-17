import React from 'react';
import {View,Text,Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import { Ionicons } from '@expo/vector-icons';
import Color from '../utilis/colors';

import TodayScreen from '../Screens/TodayScreen';
import TomorrowScreen from '../Screens/TomorrowScreen';
import CalenderScreen from '../Screens/CalendarScreen';

const Host =()=>{
    return(
      <View>
         <Text>Host</Text>
      </View>
    );
}

const TopNav = createMaterialTopTabNavigator({
   Today:{
       screen:TodayScreen,
       navigationOptions:{
           title:'Today'
       }
   },
   Tomorrow:{
       screen:TomorrowScreen,
       navigationOptions:{
           title:'Tomorrow'
       }
   }
},
{
  initialRouteName:'Today',
  tabBarOptions:{
    showIcon:true,
    showLabel:true,
    upperCaseLabel:false,
    indicatorStyle:{
        backgroundColor:Color.PRIMARY_COLOR
     },
     labelStyle:{
         fontWeight:'bold',
         fontSize:17
     },
     activeTintColor:Color.PRIMARY_COLOR,
     inactiveTintColor:Color.PRIMARY_FONT,
     style:{
        backgroundColor:Color.BACKGROUND_COLOR
    }
  }
});


export default createAppContainer(TopNav);