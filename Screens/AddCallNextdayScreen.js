import React,{Component} from 'react'
import { View, StyleSheet,Platform,Text,Linking } from 'react-native';
import {connect} from 'react-redux';
import {Input,Icon,ListItem,Card} from 'react-native-elements';
import * as Contacts from 'expo-contacts';
import * as Permissions from 'expo-permissions';
import Constainer from '../components/Constainer';
import Color from '../utilis/colors';
import {addCallTomorrow,fetchTomorrowCalls,checkedCallDone,checkedCallUndone} from '../actions/callAction';

class CallNextDayScreen extends Component{

    state={
        name:'',
        number:'',
        person:[],
        contactList:[],
        showContacts:false
    }

    UNSAFE_componentWillMount(){
        this.props.fetchTomoCalls()
        this.fetchCantacts()
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
        this.props.fetchTomoCalls()
      }

    render(){

        const lists = this.props.tomocalls.map((list)=>(
            <ListItem
              key={list.id}
              title={list.name}
              titleProps={{style:list.done?styles.doneStyle:styles.undoneStyle}}
              //onPress={()=>list.done?this.checkedCallUndone(list.id):this.checkedCallDone(list.id)}
              //rightIcon={<Icon name='phone' onPress={()=>Linking.openURL(`tel:${list.number}`)}/>}
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

        return(
           <Constainer>
               <Card>
                   {lists}
               </Card>

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
           </View>

           </Constainer>
        )
    }
}

const mapStateToProps =(state)=>{
    return{
      id: state.newCallTomorrow,
      tomocalls: state.listTomorrowCalls,
      checked: state.markCallDone,
      unchecked: state.markCallUndone
    };
  };
  
  const mapDispatchToProps = (despatch)=>{
    return{
      fetchTomoCalls:()=>despatch(fetchTomorrowCalls()),
      saveCall:(name,number)=>despatch(addCallTomorrow(name,number)),
      checkedCallDone:(id)=>despatch(checkedCallDone(id)),
      checkedCallUndone:(id)=>despatch(checkedCallUndone(id))
    };
  };

const styles = StyleSheet.create({
    row:{
      flexDirection:'column',
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

  export default connect(mapStateToProps,mapDispatchToProps)(CallNextDayScreen)