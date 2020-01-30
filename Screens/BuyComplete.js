import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';

import {fetchDoneBuy} from '../actions/buyAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from '../utilis/colors';

class BuyComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneBuy();
    }

    render(){

        const buys = this.props.listBuysDone.map((buy)=>(
            <ListItem
               key={buy.id}
               title={buy.buy}
               titleProps={{style:styles.doneStyle}}
            />
        ))

        return(
           <Container>
              {this.props.listBuysDone.length>-1?<Card>{buys}</Card>:<EmptyTaskMessage task='Buy'/>}
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
       fetchDoneBuy:()=>despatch(fetchDoneBuy())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(BuyComplete);


