import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem,Icon} from 'react-native-elements';
import { connect } from 'react-redux';

import {fetchDoneStudy,studyUndrop,fetchData} from '../actions/studyAction';

import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';

class StudyComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneStudy()
    }

    undropMyStudy=(id)=>{
        this.props.studyUndrop(id);
        this.props.fetchDoneStudy();
        this.props.fetchData();
    }

    render(){

        const studys = this.props.doneStudy.map((study)=>(
            <ListItem
               key={study.id}
               title={study.study}
               rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyStudy(study.id)}/>}
               titleProps={{style:study.done==1?styles.doneStyle:styles.undoneStyle}}
            />
        ))

        return(
           <Container>
               {this.props.doneStudy.length>-1?
               <>
                {studys}
              </>:
              <EmptyTaskMessage task="Study"/>}
           </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        doneStudy:state.listDoneStudy
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        fetchDoneStudy:()=>despatch(fetchDoneStudy()),
        studyUndrop:(id)=>despatch(studyUndrop(id)),
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

export default connect(mapStateToProps,mapDespatchToProps)(StudyComplete);