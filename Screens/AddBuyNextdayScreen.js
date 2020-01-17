import React, { Component } from 'react';
import {Text,View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import {addTomorrowBuy,fetchTomorrowData} from '../actions/buyAction';

import Container from '../components/Constainer';

class AddBuyNextdayScreen extends Component{
   
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
               titleProps={{style:buy.done?styles.doneStyle:styles.undoneStyle}}
               bottomDivider
            />
        ))
        return(
            <Container>
          <Card>
          {buy}
          </Card>

          <View style={styles.row}>
          <Input
            value={this.state.buy}
            onChangeText={(text)=>this.setState({buy:text})}
            onSubmitEditing={()=>this.addBuy()}
            enablesReturnKeyAutomatically={true}
            placeholder='E.g. sugar'
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.buy>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addBuy()}
          />*/}
        </View>
        </Container>
        );
    }

}

const mapStateToProps =(state)=>{
    return{
        id: state.newTomorrowBuy,
        buys: state.listTomorrowBuy
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
       saveBuy:(buy)=>despatch(addTomorrowBuy(buy)),
       fetchData:()=>despatch(fetchTomorrowData()),
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
    },
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
    undoneStyle:{
        fontWeight:'normal'
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(AddBuyNextdayScreen);