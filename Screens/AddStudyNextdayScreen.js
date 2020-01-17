import React, { Component } from 'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import Container from '../components/Constainer';
import {addTomorrowStudy,fetchTomorrowData} from '../actions/studyAction';

class AddStudyNextdayScreen extends Component{

    state={
        study:''
      }
    
      UNSAFE_componentWillMount(){
        this.props.fetchData();
      }
    
      addStudy=()=>{
         const {study} = this.state;
         this.props.saveStudy(study);
         this.setState({study:''});
         this.props.fetchData();
      }
    
    render(){

        const studys = this.props.studies.map((study)=>(
            <ListItem
              key={study.id}
              title={study.study}
              titleProps={{style:study.done?styles.doneStyle:styles.undoneStyle}}
              bottomDivider
            />
          ))

        return(
      <Container>
         <Card>
          {studys}
          </Card>
           <View style={styles.row}>
           <Input
            value={this.state.study}
            onChangeText={(text)=>this.setState({study:text})}
            onSubmitEditing={()=>this.addStudy()}
            enablesReturnKeyAutomatically={true}
            placeholder='E.g. English'
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.study>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addStudy()}
          />*/}
        </View>
       </Container>
        );
    }
}

const mapStateToProps =(state)=>{
    return{
      id:state.newTomorrowStudy,
      studies:state.listTomorrowStudys
    }
  }
  
  const mapDespatchToState=(despatch)=>{
    return{
      saveStudy:(study)=>despatch(addTomorrowStudy(study)),
      fetchData:()=>despatch(fetchTomorrowData())
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

  export default connect(mapStateToProps,mapDespatchToState)(AddStudyNextdayScreen)