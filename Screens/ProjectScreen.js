import React,{ Component } from 'react';
import {View,StyleSheet, Alert,KeyboardAvoidingView,Platform} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';
import ProjectComplete from '../Screens/ProjectComplete';
import Color from '../utilis/colors';
import {addProject,fetchData,checkedProjectDone,checkedProjectUndone,deleteProject,fetchDoneProject,projectDrop} from '../actions/projectAction';


class ProjectScreen extends Component{

    state={
        project:''
    }

    UNSAFE_componentWillMount(){
        this.props.fetchData();
    }

    addProject=()=>{
        const {project} = this.state;
        this.props.saveProject(project);
        this.setState({project:''});
        this.props.fetchData();
    }

    checkedProjectDone=(id)=>{
        this.props.checkedProjectDone(id);
        this.props.fetchDoneProject();
        this.props.fetchData();
    }

    checkedProjectUndone=(id)=>{
        this.props.checkedProjectUndone(id);
        this.props.fetchData();
    }

    deleteMyProject=(id)=>{
        this.props.deleteProject(id);
        this.props.fetchData()
    }

    dropMyProject=(id)=>{
        this.props.projectDrop(id);
        this.props.fetchData();
        this.props.fetchDoneProject();
    }

    render(){
        const projects = this.props.projects.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              titleProps={{style:project.done?styles.doneStyle:styles.undoneStyle}}
              onPress={()=>project.done?this.checkedProjectUndone(project.id):this.checkedProjectDone(project.id)}
              rightIcon={
              <>  
              <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                  'Confirmation',
                  'Remove Task ?',
                  [
                      {text:'YES',onPress:()=>this.deleteMyProject(project.id)},
                      {text:'NO'}
                  ]
              )}/>
              <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyProject(project.id)}/>
              </>
              }
              bottomDivider
            />
        ))

        return(
        <Container>
         <Card containerStyle={styles.cardStyle}>
          <>
         <Accordian title='Projects'/>
          {projects}

          <View style={styles.row}>
          <Input
            value={this.state.project}
            onChangeText={(text)=>this.setState({project:text})}
            onSubmitEditing={()=>this.addProject()}
            enablesReturnKeyAutomatically={true}
            placeholder='E.g. school blocks'
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.project>0}
            color={Color.PRIMARY_COLOR} size={30}
            onPress={()=>this.addProject()}
          />*/}
        </View>
         <CompleteTask>
             <ProjectComplete/>
         </CompleteTask>
          </>
         </Card>
        </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.newProject,
        projects:state.listProjects,
        checked:state.markProjectDone,
        unchecked:state.markProjectUndone,
        delete:state.deleteProject
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveProject:(project)=>despatch(addProject(project)),
        fetchData:()=>despatch(fetchData()),
        checkedProjectDone:(id)=>despatch(checkedProjectDone(id)),
        checkedProjectUndone:(id)=>despatch(checkedProjectUndone(id)),
        deleteProject:(id)=>despatch(deleteProject(id)),
        fetchDoneProject:()=>despatch(fetchDoneProject()),
        projectDrop:(id)=>despatch(projectDrop(id))
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
    },
    keyView:{
        flex:1
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(ProjectScreen);