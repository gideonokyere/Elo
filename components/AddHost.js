import React from 'react';
import {View,Text} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Color from '../utilis/colors';

import AddCallScreen from '../Screens/AddCallScreen'


const AddHost =()=>{
    return(
      <View>
         <Text>ADD HOST</Text>
      </View>
    );
}

const AddHostNav = createMaterialTopTabNavigator({
   AddCall:{
       screen:AddCallScreen,
       navigationOptions:{
           title:'Add Call'
       }
   }
},
{
  initialRouteName:'AddCall',
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


export default createAppContainer(AddHostNav);