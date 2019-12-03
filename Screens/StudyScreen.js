import React, { Component } from 'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import Container from '../components/Constainer';
import {addStudy,fetchData,checkedStudyDone,checkedStudyUndone} from '../actions/studyAction';

class StudyScreen extends Component{

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

  checkedStudyDone=(id)=>{
    this.props.checkedStudyDone(id);
    this.props.fetchData();
  }

  checkedStudyUndone=(id)=>{
    this.props.checkedStudyUndone(id);
    this.props.fetchData();
  }

  render(){
    const studys = this.props.studys.map((study)=>(
      <ListItem
        key={study.id}
        title={study.study}
        titleProps={{style:study.done?styles.doneStyle:styles.undoneStyle}}
        onPress={()=>study.done?this.checkedStudyUndone(study.id):this.checkedStudyDone(study.id)}
        bottomDivider
      />
    ))
    return(
       <Container>
          {studys}
           <View style={styles.row}>
           <Input
            value={this.state.study}
            onChangeText={(text)=>this.setState({study:text})}
            placeholder='E.g. English'
          />
          <Icon 
            name='add'
            disabled={!this.state.study>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addStudy()}
          />
        </View>
       </Container>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    id:state.newStudy,
    studys:state.listStudys,
    checked:state.markStudyDone,
    unchecked:state.markStudyUndone
  }
}

const mapDespatchToState=(despatch)=>{
  return{
    saveStudy:(study)=>despatch(addStudy(study)),
    fetchData:()=>despatch(fetchData()),
    checkedStudyDone:(id)=>despatch(checkedStudyDone(id)),
    checkedStudyUndone:(id)=>despatch(checkedStudyUndone(id))
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


export default connect(mapStateToProps,mapDespatchToState)(StudyScreen);

