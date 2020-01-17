import React,{Component} from 'react';
import {StyleSheet,View,KeyboardAvoidingView} from 'react-native';
import Calendar from './Calendar';
import {Header} from 'react-native-elements';
import Color from '../utilis/colors'
import Host from './Host';

class HomeScreen extends Component{

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1}}>
             <Header
               leftComponent={{text:'Azura'}}
               containerStyle={styles.constainer}
               rightComponent={<Calendar/>}
             />
              <Host/>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    constainer:{
        backgroundColor:Color.PRIMARY_COLOR
    }
});



export default HomeScreen;