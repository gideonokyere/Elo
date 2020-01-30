import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { Icon} from 'react-native-elements';
import Color from '../utilis/colors';
import Accordian from '../components/Accordian';

import CallComplete from '../Screens/CallComplete';
import TodoComplete from '../Screens/TodoComplete';
import GotoComplete from '../Screens/GotoComplete';
import BuyComplete from '../Screens/BuyComplete';
import VisitComplete from '../Screens/VisitComplete';
import StudyComplete from  '../Screens/StudyComplete';
import ProjectComplete from '../Screens/ProjectComplete';
import DailyComplete from '../Screens/DailyComplete';

class CompleteTask extends Component{

    state={
        expanded:false
    }

    toggleExpand=()=>{
        this.setState({expanded:!this.state.expanded})
    }

    render(){
        return(
           <View>

              <TouchableOpacity style={styles.row} onPress={()=>this.toggleExpand()}>
                 <Text style={styles.title}>Completed Task</Text>
                 <Icon name={this.state.expanded?'chevrons-up':'chevrons-down'} type='feather' color={Color.ACCORDIAL_TITLE} size={30}/>
              </TouchableOpacity>

              <View style={styles.parentHr}/>

              {
                  this.state.expanded &&
                   <View style={styles.child}>

                       <Accordian title="Daily">
                           <DailyComplete/>
                       </Accordian>

                       <Accordian title="Call">
                          <CallComplete/>
                       </Accordian>

                       <Accordian title="To Do">
                           <TodoComplete/>
                       </Accordian>

                       <Accordian title="Go To">
                          <GotoComplete/>
                       </Accordian>

                       <Accordian title="Buy">
                           <BuyComplete/>
                       </Accordian>

                       <Accordian title="Visit">
                          <VisitComplete/>
                       </Accordian>

                       <Accordian title="Study">
                           <StudyComplete/>
                       </Accordian>

                       <Accordian title="Project">
                           <ProjectComplete/>
                       </Accordian>

                   </View>
              }
           </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight:'normal',
        color: Color.ACCORDIAL_TITLE,
    },
    row:{
        flexDirection: 'column',
        justifyContent:'center',
        height:56,
        paddingLeft:25,
        paddingRight:18,
        alignItems:'center',
        backgroundColor: Color.BACKGROUND_COLOR,
    },
    parentHr:{
        height:1,
        color: 'white',
        width:'100%'
    },
    child:{
        backgroundColor:Color.BACKGROUND_COLOR,
        padding:10,
    }
    
});

export default CompleteTask;