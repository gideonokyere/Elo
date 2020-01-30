import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem} from 'react-native-elements';
import { connect } from 'react-redux';

import {fetchDoneProject} from '../actions/projectAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';

class ProjectComplete extends Component{
    

    UNSAFE_componentWillMount(){
        this.props.fetchProjectDone()
    }

    render(){

        const projects = this.props.listProjectsDone.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              titleProps={{style:styles.doneStyle}}
            />
        ))

        return(
            <Container>
              {this.props.listProjectsDone.length>-1?<Card>{projects}</Card>:<EmptyTaskMessage task="Project"/>}
            </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        listProjectsDone:state.listDoneProject,
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        fetchProjectDone:()=>despatch(fetchDoneProject())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(ProjectComplete);