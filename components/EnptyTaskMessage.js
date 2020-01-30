import React,{Component} from 'react';
import {Text,StyleSheet} from 'react-native';
import Container from '../components/Constainer';
import Color from '../utilis/colors';

class EmptyTaskMessage extends Component{
    render(){
        return(
            <Container>
                <Text style={styles.messageStyle}>You have no completed {this.props.task} task</Text>
            </Container>
        )
    }
}

const styles=StyleSheet.create({
    messageStyle:{
        textAlign:'center',
        fontSize:20,
        color:'#CBC6C5'
    }
})

export default EmptyTaskMessage;