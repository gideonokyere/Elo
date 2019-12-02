import React, { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import {addBuy,fetchData} from '../actions/buyAction';

import Container from '../components/Constainer';

class BuyScreen extends Component{
  
    state={
        buy:''
    }

    UNSAFE_componentWillMount(){
        this.props.fetchData();
    }

    addBuy=()=>{
        const {buy} = this.state;
        this.props.saveBuy(buy);
        this.setState({buy:''});
        this.props.fetchData();
    }

    render(){

        const buy = this.props.buys.map((buy)=>(
            <ListItem
               key={buy.id}
               title={buy.buy}
               bottomDivider
            />
        ))

    return(
       <Container>
          
          {buy}

          <View style={styles.row}>
          <Input
            value={this.state.buy}
            onChangeText={(text)=>this.setState({buy:text})}
            placeholder='E.g. sugar'
          />
          <Icon 
            name='add'
            disabled={!this.state.buy>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addBuy()}
          />
        </View>
        </Container>
     );
    }
}

const mapStateToProps =(state)=>{
    return{
        id: state.newBuy,
        buys: state.listBuys
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
       saveBuy:(buy)=>despatch(addBuy(buy)),
       fetchData:()=>despatch(fetchData())
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
    }
  })


export default connect(mapStateToProps,mapDespatchToProps)(BuyScreen);