import React,{ Component } from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView} from 'react-native';
import {Icon,Input,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addProject,fetchData,checkedProjectDone,checkedProjectUndone} from '../actions/projectAction';


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
        this.props.fetchData();
    }

    checkedProjectUndone=(id)=>{
        this.props.checkedProjectUndone(id);
        this.props.fetchData();
    }

    render(){
        const projects = this.props.projects.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              titleProps={{style:project.done?styles.doneStyle:styles.undoneStyle}}
              onPress={()=>project.done?this.checkedProjectUndone(project.id):this.checkedProjectDone(project.id)}
              bottomDivider
            />
        ))

        return(
     <KeyboardAvoidingView style={{flex:1}}>
         {projects}
         <View style={styles.row}>
          <Input
            value={this.state.project}
            onChangeText={(text)=>this.setState({project:text})}
            placeholder='E.g. school blocks'
          />
          <Icon 
            name='add'
            disabled={!this.state.project>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addProject()}
          />
        </View>
     </KeyboardAvoidingView>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.newProject,
        projects:state.listProjects,
        checked:state.markProjectDone,
        unchecked:state.markProjectUndone
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveProject:(project)=>despatch(addProject(project)),
        fetchData:()=>despatch(fetchData()),
        checkedProjectDone:(id)=>despatch(checkedProjectDone(id)),
        checkedProjectUndone:(id)=>despatch(checkedProjectUndone(id))
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
        fontWeight:'bold'
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(ProjectScreen);