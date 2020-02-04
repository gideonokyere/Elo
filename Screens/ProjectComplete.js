import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem,Icon} from 'react-native-elements';
import { connect } from 'react-redux';

import {fetchDoneProject,projectUndrop,fetchData} from '../actions/projectAction';

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';

class ProjectComplete extends Component{
    

    UNSAFE_componentWillMount(){
        this.props.fetchProjectDone()
    }

    undropMyProject=(id)=>{
       this.props.projectUndrop(id);
       this.props.fetchProjectDone();
       this.props.fetchData()
    }

    render(){

        const projects = this.props.listProjectsDone.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              rightIcon={<Icon ame='dots-three-horizontal' type='entypo' onPress={()=>this.projectUndrop(project.id)}/>}
              titleProps={{style:project.done==1?styles.doneStyle:styles.undoneStyle}}
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
        fetchProjectDone:()=>despatch(fetchDoneProject()),
        projectUndrop:(id)=>despatch(projectUndrop(id)),
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

export default connect(mapStateToProps,mapDespatchToProps)(ProjectComplete);