import React from 'react';
import {Text} from 'react-native';
import Container from '../components/Constainer';

const BuyScreen = (props) =>{

     props.navigationOptions = {
        title:'BUY'
    }

    return(
       <Container>
          <Text>BUY SCREEN</Text>
        </Container>
    );
}


export default BuyScreen;