import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import Add from './Add';
import {Header} from 'react-native-elements';
import Color from '../utilis/colors'
import Host from './Host';
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