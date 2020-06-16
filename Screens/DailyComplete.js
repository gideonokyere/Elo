import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Icon} from 'react-native-elements';
import { connect } from 'react-redux';

import {fetchDoneDaily,callTaskUndrop,fetchData} from '../actions/dailyAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Accordian from '../components/Accordian';
import Color from  '../utilis/colors';

class DailyComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneDaily()
    }

    undropDailyCall=(id)=>{
        this.props.undropCallTask(id);
        this.props.fetchDoneDaily();
        this.props.fetchDaily();
    }

    render(){
        const dailys = this.props.listDoneDaily.map((daily)=>(
            <ListItem
               key={daily.id}
               title={daily.daily}
               titleProps={{style:daily.done==1?styles.doneStyle:styles.undoneStyle}}
               rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropDailyCall(daily.id)}/>}
            />
        ))
        return(
          <Container>
             {this.props.listDoneDaily.length>-1?<>
                  {dailys}
                 </>
                :<EmptyTaskMessage task="Daily"/>}
          </Container>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        listDoneDaily:state.listDoneDaily,
        unDropId:state.undropCallTask
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        fetchDoneDaily:()=>despatch(fetchDoneDaily()),
        undropCallTask:(id)=>despatch(callTaskUndrop(id)),
        fetchDaily:()=>despatch(fetchData())
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

export default connect(mapStateToProps,mapDespatchToProps)(DailyComplete)