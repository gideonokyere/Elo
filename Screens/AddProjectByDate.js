import React,{ Component } from 'react';
import {View,StyleSheet, Alert} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addProjectByDates,listProjectByDates,checkedProjectDone,checkedProjectUndone,deleteProject,fetchDoneProject,projectDrop} from '../actions/projectAction';


class AddProjectByDate extends Component{

    state={
        project:''
    }

    UNSAFE_componentWillMount(){
        this.props.fetchData();
    }

    addProject=()=>{
        const {project} = this.state;
        const date = this.props.date;
        this.props.saveProject(project,date);
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
          </>
         </Card>
        </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.addProjectByDate,
        projects:state.listProjectByDate,
        checked:state.markProjectDone,
        unchecked:state.markProjectUndone,
        delete:state.deleteProject
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveProject:(project,date)=>despatch(addProjectByDates(project,date)),
        fetchData:()=>despatch(listProjectByDates()),
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
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(AddProjectByDate);