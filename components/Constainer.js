import React,{Component} from 'react';
import {SafeAreaView,StyleSheet,KeyboardAvoidingView} from 'react-native';
import Color from '../utilis/colors'

 class Container extends Component{
    render(){
      return(
      <KeyboardAvoidingView style={styles.constainer}>
       <SafeAreaView style={styles.constainer}>
          {this.props.children}
       </SafeAreaView>
       </KeyboardAvoidingView>
      );
    }
}

const styles = StyleSheet.create({
   constainer:{
       flex:1,
       backgroundColor:Color.BACKGROUND_COLOR
   }
});

export default Container;