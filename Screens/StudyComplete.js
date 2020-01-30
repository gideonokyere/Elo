import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem} from 'react-native-elements';
import { connect } from 'react-redux';

import {fetchDoneStudy} from '../actions/studyAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';

class StudyComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneStudy()
    }

    render(){

        const studys = this.props.doneStudy.map((study)=>(
            <ListItem
               key={study.id}
               title={study.study}
               titleProps={{style:styles.doneStyle}}
            />
        ))

        return(
           <Container>
               {this.props.doneStudy.length>-1?<Card>{studys}</Card>:<EmptyTaskMessage task="Study"/>}
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
        fetchDoneStudy:()=>despatch(fetchDoneStudy())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(StudyComplete);