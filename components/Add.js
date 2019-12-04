import React,{Component} from 'react';
import {Modal, View,StyleSheet,SafeAreaView} from 'react-native';
import {Icon,ButtonGroup} from 'react-native-elements';
import Color from '../utilis/colors';

import AddHost from '../components/AddHost'
import AddCallScreen from '../Screens/AddCallScreen'

class Add extends Component{

    state={
        showModal:false,
        selectedIndex:2
    }


    render(){
        const buttons =['CALL','TODO','GOTO','STUDY','BUY'];
        const {selectedIndex} = this.state;
        
        let screen;

        if(selectedIndex===0){
            screen = <AddCallScreen/>
        }

        return(
             <View>
              <Icon name='add' raised onPress={()=>this.setState({showModal:true})}/>
              
              
               <Modal animated='slide' visible={this.state.showModal}>
                  <SafeAreaView style={styles.modalStyle}>
                     
                     <ButtonGroup
                        buttons={buttons}
                        selectedIndex={selectedIndex}
                        onPress={(selectedIndex)=>this.setState({selectedIndex})}
                     />
                       
                       {screen}
                       
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

export default Add