import React, { Component } from 'react';
import { View, StyleSheet,Platform,Text } from 'react-native';
import {connect} from 'react-redux';
import {Input,Icon,ListItem} from 'react-native-elements';
import Constainer from '../components/Constainer';
import Color from '../utilis/colors';
import {addCall,fetchCalls,checkedCallDone,checkedCallUndone} from '../actions/callAction';

class AddCallScreen extends Component {

  state={
    name:''
  }

  
  UNSAFE_componentWillMount(){
    this.props.fetchCalls()
 }
  
  addCall=()=>{
    const {name} = this.state;
    this.props.saveCall(name);
    this.setState({name:''});
    this.props.fetchCalls()
  }

  checkedCallDone=(id)=>{
     this.props.checkedCallDone(id);
     this.props.fetchCalls();
  }

  checkedCallUndone=(id)=>{
    this.props.checkedCallUndone(id);
    this.props.fetchCalls()
  }

  
render(){
  const lists = this.props.calls.map((list)=>(
      <ListItem
        key={list.id}
        title={list.name}
        titleProps={{style:list.done?styles.doneStyle:styles.undoneStyle}}
        onPress={()=>list.done?this.checkedCallUndone(list.id):this.checkedCallDone(list.id)}
        bottomDivider
      />
  ))

  return (
    <Constainer>
          {lists}
        <View style={styles.row}>
          <Input
            value={this.state.name}
            onChangeText={(text)=>this.setState({name:text})}
            placeholder='Who do you want to call E.g. Sally'
          />
          <Icon 
            name='add'
            disabled={!this.state.name>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addCall()}
          />
        </View>
    </Constainer> 
  );
}
}

const mapStateToProps =(state)=>{
  return{
    id: state.newCall,
    calls: state.listCalls,
    checked: state.markCallDone,
    unchecked: state.markCallUndone
  };
};

const mapDispatchToProps = (despatch)=>{
  return{
    fetchCalls:()=>despatch(fetchCalls()),
    saveCall:(name)=>despatch(addCall(name)),
    checkedCallDone:(id)=>despatch(checkedCallDone(id)),
    checkedCallUndone:(id)=>despatch(checkedCallUndone(id))
  };
};

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

export default connect(mapStateToProps,mapDispatchToProps)(AddCallScreen);