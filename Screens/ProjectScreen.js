import React,{ Component } from 'react';
import {View,Text,StyleSheet,KeyboardAvoidingView} from 'react-native';
import {Icon,Input,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addProject,fetchData} from '../actions/projectAction';


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

    render(){
        const projects = this.props.projects.map((project)=>(
            <ListItem
              key={project.id}
              title={project.project}
              bottomDivider
            />
        ))

        return(
     <Container>
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
     </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.newProject,
        projects:state.listProjects
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveProject:(project)=>despatch(addProject(project)),
        fetchData:()=>despatch(fetchData())
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
    }
  })

  export default connect(mapStateToProps,mapDespatchToProps)(ProjectScreen);