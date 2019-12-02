import React, { Component } from 'react';
import { View, StyleSheet,Platform,Text } from 'react-native';
import {connect} from 'react-redux';
import {Input,Icon,ListItem} from 'react-native-elements';
import Constainer from '../components/Constainer';
import Color from '../utilis/colors';
import {addCall,fetchCalls} from '../actions/callAction';

class AddCallScreen extends Component {

  state={
    name:''
  }

  addCall=()=>{
    const {name} = this.state;
    this.props.saveCall(name);
    this.setState({name:''});
    this.props.fetchCalls()
  }

  UNSAFE_componentWillMount(){
     this.props.fetchCalls()
  }

  
render(){
  const lists = this.props.calls.map((list)=>(
      <ListItem
        key={list.id}
        title={list.name}
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
    calls: state.listCalls
  };
};

const mapDispatchToProps = (despatch)=>{
  return{
    fetchCalls:()=>despatch(fetchCalls()),
    saveCall:(name)=>despatch(addCall(name))
  };
};

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    paddingRight:18,
  }
})

export default connect(mapStateToProps,mapDispatchToProps)(AddCallScreen);