import React,{Component} from 'react';
import {Modal, View,StyleSheet,SafeAreaView,Text,Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import Color from '../utilis/colors';

class Calendar extends Component{

    state={
        showModal:false
    }


    render(){
        
        return(
             <View>
              <Icon type='ionicon' name='ios-calendar' color={Color.PRIMARY_COLOR} raised onPress={()=>this.setState({showModal:true})}/>
              
              
               <Modal animated='slide' visible={this.state.showModal}>
                  <SafeAreaView style={styles.modalStyle}>
                     
                     <Text>Calendar</Text>
                       
                  </SafeAreaView>
                 <Icon 
                  name='close' 
                  raised 
                  onPress={()=>this.setState({showModal:false})}
                  color={Color.PRIMARY_COLOR}
                  containerStyle={{backgroundColor:Color.PRIMARY_COLOR}}
                  />
               </Modal>
               

            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalStyle:{
        flex:2
    }
})

export default Calendar