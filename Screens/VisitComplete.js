import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDoneVisit} from '../actions/visitAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';


class VisitComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchVisitDone()
    }

    render(){

        const visits = this.props.listVisitDone.map((visit)=>(
            <ListItem
              key={visit.id}
              title={visit.visit}
              titleProps={{style:styles.doneStyle}}
              topDivider
            />
        ))

        return(
            <Container>
                {this.props.listVisitDone.length>-1?<Card>{visits}</Card>:<EmptyTaskMessage task='Visit'/>}
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
        fetchVisitDone:()=>despatch(fetchDoneVisit())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(VisitComplete);
