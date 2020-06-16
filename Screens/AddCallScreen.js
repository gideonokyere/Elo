import React, { Component } from 'react';
import { View, StyleSheet,Platform,Text,Linking,Alert, CheckBox } from 'react-native';
import {connect} from 'react-redux';
import {Input,Icon,ListItem,Card} from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Constainer from '../components/Constainer';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';
import CallComplete from '../Screens/CallComplete';
import Color from '../utilis/colors';
import {addCall,fetchCalls,checkedCallDone,checkedCallUndone,deleteCall,listCallDone,callDrop} from '../actions/callAction';

class AddCallScreen extends Component {

  state={
    name:'',
    number:'',
    contactList:[],
    person:[],
    showContacts:false
  }

  
  UNSAFE_componentWillMount(){
    this.props.fetchCalls();
    this.fetchCantacts();
 }

fetchCantacts = async()=>{
  const { status } = await Permissions.getAsync(Permissions.CONTACTS);
  if(status !== 'granted'){
     await  Permissions.askAsync(Permissions.CONTACTS);
  }else if(status === 'granted'){
    const {data} = await Contacts.getContactsAsync({
      fields:[Contacts.Fields.Name,Contacts.Fields.PhoneNumbers]
    });
  
    if(data.length>0){
      this.setState({contactList:data});
      //console.log(this.state.contactList);
    }
  }

}

searchContact=async(names)=>{
  this.setState({showContacts:true});
  const contacts = this.state.contactList;
  //console.log(contacts);
  const result =[];
  contacts.map((p)=>{
  result.push({name:p.name,phone:p.phoneNumbers});
  });
    const person =  result.filter(f=>f.name.includes(names));
    await this.setState({person});
    //console.log(this.state.person);

}

  addCall=()=>{
    const {name,number} = this.state;
    this.props.saveCall(name,number);
    this.setState({name:'',number:''});
    this.props.fetchCalls()
  }

  checkedCallDone=(id)=>{
     this.props.checkedCallDone(id);
     this.props.listCallDone();
     this.props.fetchCalls();
  }

  checkedCallUndone=(id)=>{
    this.props.checkedCallUndone(id);
    this.props.fetchCalls()
  }

  deleteMyCall=(id)=>{
    this.props.deleteCall(id);
    this.props.fetchCalls()
  }

  dropMyCall=(id)=>{
    this.props.callDrop(id);
    this.props.fetchCalls();
    this.props.listCallDone();
  }
  
render(){
  const lists = this.props.calls.map((list)=>(
      <ListItem
        key={list.id}
        title={list.name}
        titleProps={{style:list.done?styles.doneStyle:styles.undoneStyle}}
        onPress={()=>list.done?this.checkedCallUndone(list.id):this.checkedCallDone(list.id)}
        rightIcon={<>
                 <Icon name='phone' onPress={()=>Linking.openURL(`tel:${list.number}`)}/>
                 <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                    'Confirmation',
                    'Remove Task ?',
                    [
                      {text:'YES',onPress:()=>this.deleteMyCall(list.id)},
                      {text:'NO'}
                    ]
                  )}/>

                  <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyCall(list.id)}/>

                 </>}
        bottomDivider
      /> 
  ));
  
  const persons = this.state.person.map((p,i)=>(
    <ListItem
      key={i+1}
      title={p.name}
      onPress={()=>this.setState({name:p.name,number:p.phone[0].digits,showContacts:false})}
    />
  ))

  return (
    <Constainer>
         <Card containerStyle={styles.cardStyle}>
           <>
          <Accordian title='Call'/>
           {lists}

          <View style={styles.row}>
           <Input
            value={this.state.name}
            onChangeText={(text)=>this.setState({name:text})}
            onChange={(text)=>this.searchContact(text.nativeEvent.text)}
            onSubmitEditing={()=>this.addCall()}
            enablesReturnKeyAutomatically={true}
            placeholder='Who do you want to call E.g. Sally'
           />
          {this.state.name?this.state.showContacts && persons:null}
          {/**<Icon 
            name='add'
            disabled={!this.state.name>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addCall()}
          />*/}
        </View>

         <CompleteTask>
            <CallComplete/>
         </CompleteTask>
           </>
          </Card>
    </Constainer> 
  );
}
}

const mapStateToProps =(state)=>{
  return{
    id: state.newCall,
    calls: state.listCalls,
    checked: state.markCallDone,
    unchecked: state.markCallUndone,
    delete:state.deleteCall
  };
};

const mapDispatchToProps = (despatch)=>{
  return{
    fetchCalls:()=>despatch(fetchCalls()),
    saveCall:(name,number)=>despatch(addCall(name,number)),
    checkedCallDone:(id)=>despatch(checkedCallDone(id)),
    checkedCallUndone:(id)=>despatch(checkedCallUndone(id)),
    deleteCall:(id)=>despatch(deleteCall(id)),
    listCallDone:()=>despatch(listCallDone()),
    callDrop:(id)=>despatch(callDrop(id))
  };
};

const styles = StyleSheet.create({
  row:{
    flexDirection:'column',
    paddingRight:18,
    marginBottom:15
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

export default connect(mapStateToProps,mapDispatchToProps)(AddCallScreen);