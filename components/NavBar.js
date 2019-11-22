import React,{Component} from 'react';
import {Platform,StyleSheet} from 'react-native';
import {Header} from 'react-native-elements';
import {createAppContainer} from 'react-navigation';
import Color from '../utilis/colors'
import Host from './Host';
import AddCallScreen from '../Screens/AddCallScreen';

import Container from './Constainer';

class HomeScreen extends Component{
    render(){
        return(
           <Container>
             <Header
               leftComponent={{text:'Azura'}}
               containerStyle={styles.constainer}
             />

              <Host/>
           </Container>
        );
    }
}

const styles = StyleSheet.create({
    constainer:{
        backgroundColor:Color.PRIMARY_COLOR
    }
});



export default HomeScreen;