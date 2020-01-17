import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import { Icon} from 'react-native-elements';
import Color from '../utilis/colors';

class Accordian extends Component{

    state={
        expanded:true
    }

    toggleExpand=()=>{
        this.setState({expanded:!this.state.expanded})
    }

    render(){
        return(
           <View>

              <TouchableOpacity style={styles.row}>
                 <Text style={styles.title}>{'+ ' + this.props.title}</Text>
                 <Icon name={this.state.expanded?'keyboard-arrow-up':'keyboard-arrow-down'} color={Color.ACCORDIAL_TITLE} size={30}/>
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
        fontSize: 20,
        fontWeight:'normal',
        color: Color.ACCORDIAL_TITLE,
    },
    row:{
        flexDirection: 'row',
        justifyContent:'space-between',
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

export default Accordian;