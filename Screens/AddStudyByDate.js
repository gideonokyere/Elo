import React, { Component } from 'react';
import {View,StyleSheet,Alert} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Color from '../utilis/colors';
import Container from '../components/Constainer';
import {addStudyByDates,listStudyByDates,checkedStudyDone,checkedStudyUndone,deleteStudy,fetchDoneStudy,studyDrop} from '../actions/studyAction';

class AddStudyByDate extends Component{

  state={
    study:''
  }

  UNSAFE_componentWillMount(){
    this.props.fetchData();
  }

  addStudy=()=>{
     const {study} = this.state;
     const date = this.props.date;
     this.props.saveStudy(study,date);
     this.setState({study:''});
     this.props.fetchData();
  }

  checkedStudyDone=(id)=>{
    this.props.checkedStudyDone(id);
    this.props.fetchDoneStudy();
    this.props.fetchData();
  }

  checkedStudyUndone=(id)=>{
    this.props.checkedStudyUndone(id);
    this.props.fetchData();
  }

  deleteMyStudy=(id)=>{
    this.props.deleteStudy(id);
    this.props.fetchData()
  }

  dropMyStudy=(id)=>{
    this.props.studyDrop(id);
    this.props.fetchData();
    this.props.fetchDoneStudy();
  }

  render(){
    const studys = this.props.studys.map((study)=>(
      <ListItem
        key={study.id}
        title={study.study}
        titleProps={{style:study.done?styles.doneStyle:styles.undoneStyle}}
        onPress={()=>study.done?this.checkedStudyUndone(study.id):this.checkedStudyDone(study.id)}
        rightIcon={
          <>
          <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
          'Confirmation',
          'Remove Task ?',
          [
            {text:'YES',onPress:()=>this.deleteMyStudy(study.id)},
            {text:'NO'}
          ]
        )}/>
        <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyStudy(study.id)}/>
        </>
        }
        bottomDivider
      />
    ))
    return(
       <Container>
         <Card containerStyle={styles.cardStyle}>
           <>
          {studys}
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
          </>
          </Card>
       </Container>
    );
  }
}

const mapStateToProps =(state)=>{
  return{
    id:state.addStudyByDate,
    studys:state.listStudyByDate,
    checked:state.markStudyDone,
    unchecked:state.markStudyUndone,
    delete:state.deleteStudy
  }
}

const mapDespatchToState=(despatch)=>{
  return{
    saveStudy:(study,date)=>despatch(addStudyByDates(study,date)),
    fetchData:()=>despatch(listStudyByDates()),
    checkedStudyDone:(id)=>despatch(checkedStudyDone(id)),
    checkedStudyUndone:(id)=>despatch(checkedStudyUndone(id)),
    deleteStudy:(id)=>despatch(deleteStudy(id)),
    fetchDoneStudy:()=>despatch(fetchDoneStudy()),
    studyDrop:(id)=>despatch(studyDrop(id))
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


export default connect(mapStateToProps,mapDespatchToState)(AddStudyByDate);

