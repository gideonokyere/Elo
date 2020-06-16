import React,{Component} from 'react';
import {View,Text,TouchableOpacity,StyleSheet} from 'react-native'
import Color from '../utilis/colors';

class Accordian extends Component{


    render(){
        return(
           <View>

              <TouchableOpacity style={styles.row}>
                 <Text style={styles.title}>{'+ ' + this.props.title}</Text>
              </TouchableOpacity>


           </View>
        );
    }
}

const styles = StyleSheet.create({
    title:{
        fontSize: 20,
        fontWeight:'bold',
        color: Color.BLACK,
    },
    row:{
        flexDirection: 'row',
        height:56,
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