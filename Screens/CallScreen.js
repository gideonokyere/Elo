import React,{Component} from 'react';
import {Text,Platform} from 'react-native';
import {createAppContainer} from 'react-navigation';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import TodayCallScreen from './TodayScreen';
import Container from '../components/Constainer';

class CallScreen extends Component{
    
    render(){
        return(
          <Container>
              <Text>Today</Text>
          </Container>
        );
    }
}



const CallTab = createMaterialTopTabNavigator({
    ToDay:{
        screen:CallScreen,
        navigationOptions:{
            title:"ToDay's Calls"
        }
    },
    Tomorrow:{screen:TodayCallScreen}
},
{
   initialRouteName:'ToDay',
   tabBarOptions:{
       indicatorStyle:{
          backgroundColor:Platform.OS==='ios'?'white':'red'
       },
       labelStyle:{
           color:Platform.OS==='ios'?'white':'red',
           fontWeight:'bold'
        },
       style:{
           backgroundColor:Platform.OS === 'ios'?'red':'white',
       }
   }
}
);




export default createAppContainer(CallTab);
