import React,{ Component } from 'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import Color from '../utilis/colors';
import {addTomorrowProject,fetchTomorrowData} from '../actions/projectAction';


class AddProjectNexdayScreen extends Component{
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
              titleProps={{style:project.done?styles.doneStyle:styles.undoneStyle}}
              bottomDivider
            />
        ))

        return(
            <Container>
            <Card containerStyle={styles.cardStyle}>
             <>
            <Accordian title='Project'/>
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
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.newTomorrowProject,
        projects:state.listTomorrowProjects,
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveProject:(project)=>despatch(addTomorrowProject(project)),
        fetchData:()=>despatch(fetchTomorrowData()),
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

  export default connect(mapStateToProps,mapDespatchToProps)(AddProjectNexdayScreen);