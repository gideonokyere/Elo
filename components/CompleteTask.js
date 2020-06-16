import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { Icon} from 'react-native-elements';
import Color from '../utilis/colors';

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
                 <Text style={styles.title}>Completed Tasks</Text>
                 <Icon name={this.state.expanded?'chevrons-up':'chevrons-down'} type='feather' color={Color.BLACK} size={20}/>
              </TouchableOpacity>

              <View style={styles.parentHr}/>

              {
                  this.state.expanded &&
                   <View style={styles.child}>
                       {this.props.children}
                   </View>
              }
           </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 15,
        fontWeight:'normal',
        color: Color.BLACK,
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