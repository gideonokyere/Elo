import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem,Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDoneVisit,visitUndrop,fetchData} from '../actions/visitAction';

import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';


class VisitComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchVisitDone()
    }

    undropMyVisit=(id)=>{
        this.props.visitUndrop(id);
        this.props.fetchVisitDone()
        this.props.fetchData();
    }

    render(){

        const visits = this.props.listVisitDone.map((visit)=>(
            <ListItem
              key={visit.id}
              title={visit.visit}
              titleProps={{style:visit.done==1?styles.doneStyle:styles.undoneStyle}}
              rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyVisit(visit.id)}/>}
              topDivider
            />
        ))

        return(
            <Container>
                {this.props.listVisitDone.length>-1?
                <>
                  {visits}
                </>:
                <EmptyTaskMessage task='Visit'/>}
            </Container>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
        listVisitDone:state.listDoneVisit
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        fetchVisitDone:()=>despatch(fetchDoneVisit()),
        visitUndrop:(id)=>despatch(visitUndrop(id)),
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

export default connect(mapStateToProps,mapDespatchToProps)(VisitComplete);
