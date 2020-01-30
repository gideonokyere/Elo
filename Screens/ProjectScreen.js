import React,{ Component } from 'react';
import {View,StyleSheet, Alert} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addProject,fetchData,checkedProjectDone,checkedProjectUndone,deleteProject,fetchDoneProject} from '../actions/projectAction';


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

    render(){
        const projects = this.props.projects.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              titleProps={{style:project.done?styles.doneStyle:styles.undoneStyle}}
              onPress={()=>project.done?this.checkedProjectUndone(project.id):this.checkedProjectDone(project.id)}
              rightIcon={<Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                  'Confirmation',
                  'Remove Task ?',
                  [
                      {text:'YES',onPress:()=>this.deleteMyProject(project.id)},
                      {text:'NO'}
                  ]
              )}/>}
              bottomDivider
            />
        ))

        return( 
        <Container>
         <Card>
          {projects}
         </Card>
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
        fetchDoneProject:()=>despatch(fetchDoneProject())
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
    },
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
    undoneStyle:{
        fontWeight:'normal'
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(ProjectScreen);