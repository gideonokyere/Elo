import React,{Component} from 'react';
import {SafeAreaView,StyleSheet,KeyboardAvoidingView,Platform,Dimensions} from 'react-native';
import Color from '../utilis/colors'

 class Container extends Component{
    render(){
      return(
       <KeyboardAvoidingView behavior={Platform.Os == "ios" ? "padding" : "height"} style={{flex:1}} >
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
       backgroundColor:Color.BACKGROUND_COLOR,
       width:Dimensions.get('screen').width,
   }
});

export default Container;