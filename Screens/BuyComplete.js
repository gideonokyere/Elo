import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Card,Icon} from 'react-native-elements';
import {buyUndrop,fetchData,fetchDoneBuy} from '../actions/buyAction';
import {connect} from 'react-redux';

import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from '../utilis/colors';

class BuyComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneBuy();
    }

    undropMyBuy=(id)=>{
        this.props.buyUndrop(id);
        this.props.fetchDoneBuy();
        this.props.fetchData();
    }

    render(){

        const buys = this.props.listBuysDone.map((buy)=>(
            <ListItem
               key={buy.id}
               title={buy.buy}
               titleProps={{style:buy.done==1?styles.doneStyle:styles.undoneStyle}}
               rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyBuy(buy.id)}/>}
            />
        ))

        return(
           <Container>
              {this.props.listBuysDone.length>-1?
              <>
                {buys}
             </>:
             <EmptyTaskMessage task='Buy'/>}
           </Container>
        )
    }
}

const mapStateToProps = (state)=>{
    return{
        listBuysDone:state.listDoneBuy
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
       fetchDoneBuy:()=>despatch(fetchDoneBuy()),
       buyUndrop:(id)=>despatch(buyUndrop(id)),
       fetchData:()=>despatch(fetchData())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
    undoneStyle:{
        fontWeight:'normal'
    }
})

export default connect(mapStateToProps,mapDespatchToProps)(BuyComplete);


