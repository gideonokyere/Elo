import React, { Component } from 'react';
import {Text,View,StyleSheet,Alert} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';
import BuyComplete from '../Screens/BuyComplete';
import {addBuy,fetchData,checkedBuyDone,checkedBuyUndone,deleteBuy,buyDrop,fetchDoneBuy} from '../actions/buyAction';

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

    checkedBuyDone=(id)=>{
       this.props.checkedBuyDone(id);
       this.props.fetchData();
       this.props.fetchDoneBuy();
    }

    checkedBuyUndone=(id)=>{
        this.props.checkedBuyUndone(id);
        this.props.fetchData();
    }

    deleteMyBuy=(id)=>{
       this.props.deleteBuy(id);
       this.props.fetchData()
    }

    dropMyBuy=(id)=>{
        this.props.buyDrop(id);
        this.props.fetchData();
        this.props.fetchDoneBuy();
    }

    render(){

        const buy = this.props.buys.map((buy)=>(
            <ListItem
               key={buy.id}
               title={buy.buy}
               titleProps={{style:buy.done?styles.doneStyle:styles.undoneStyle}}
               onPress={()=>buy.done?this.checkedBuyUndone(buy.id):this.checkedBuyDone(buy.id)}
               rightIcon={
                  <> 
                  <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                   'Confirmation',
                   'Remove Task ?',
                   [
                       {text:'YES',onPress:()=>this.deleteMyBuy(buy.id)},
                       {text:'NO'}
                   ]
               )}/>

                <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyBuy(buy.id)}/>

               </>
               }
               bottomDivider
            />
        ))

    return(
       <Container>
          <Card containerStyle={styles.cardStyle}>
           <>
          <Accordian title='Buy'/>
          {buy}

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
          <CompleteTask>
              <BuyComplete/>
          </CompleteTask>
          </>
          </Card>
        </Container>
     );
    }
}

const mapStateToProps =(state)=>{
    return{
        id: state.newBuy,
        buys: state.listBuys,
        checked: state.markBuyDone,
        unchecked: state.markBuyUndone,
        delete:state.deleteBuy
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
       saveBuy:(buy)=>despatch(addBuy(buy)),
       fetchData:()=>despatch(fetchData()),
       checkedBuyDone:(id)=>despatch(checkedBuyDone(id)),
       checkedBuyUndone:(id)=>despatch(checkedBuyUndone(id)),
       deleteBuy:(id)=>despatch(deleteBuy(id)),
       buyDrop:(id)=>despatch(buyDrop(id)),
       fetchDoneBuy:()=>despatch(fetchDoneBuy())
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
      marginBottom:15
    },
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
    undoneStyle:{
        fontWeight:'normal'
    },
    cardStyle:{
        borderRadius:4
    }
  })


export default connect(mapStateToProps,mapDespatchToProps)(BuyScreen);