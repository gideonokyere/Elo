import React,{Component} from 'react';
import {View,StyleSheet,Alert,Dimensions} from 'react-native';
import {Icon,Input,ListItem,Card,CheckBox} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';
import DailyComplete from '../Screens/DailyComplete';
import Color from '../utilis/colors';
import {addDaily,fetchData,checkedDailyDone,checkedDailyUndone,deleteDaily,fetchDoneDaily,callTaskDrop} from '../actions/dailyAction';


class DailyScreen extends Component{

    state={
        daily:''
    }

    UNSAFE_componentWillMount(){
        this.props.fetchData();
    }

    addDaily=()=>{
        const {daily} = this.state;
        this.props.saveDaily(daily);
        this.setState({daily:''});
        this.props.fetchData();
    }


    checkedDone=(id)=>{
        this.props.checkedDone(id);
        this.props.fetchDoneDaily();
        this.props.fetchData();
    }

    checkedUndone=(id)=>{
        this.props.checkedUndone(id);
        this.props.fetchData();
    }

    deleteMyDaily=(id)=>{
        this.props.deleteDaily(id);
        this.props.fetchData()
    }

    dropMyCall=(id)=>{
        this.props.callTaskDrop(id);
        this.props.fetchData();
        this.props.fetchDoneDaily();
    }

    render(){

        const dailys = this.props.dailys.map((daily)=>(
            <ListItem
              key={daily.id}
              title={daily.daily}
              titleProps={{style:daily.done?styles.doneStyle:styles.undoneStyle}}
              onPress={()=>daily.done?this.checkedUndone(daily.id):this.checkedDone(daily.id)}
              rightIcon={
                <>
                <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                  'Confirmation',
                  'Remove Task ?',
                  [
                      {text:'YES',onPress:()=>this.deleteMyDaily(daily.id)},
                      {text:'NO'}
                  ]
              )}/>
             <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyCall(daily.id)}/>
             </>
            }
              bottomDivider
            />
        ))

        return(
           <Container>
            <Card containerStyle={styles.cardStyle}>
              <>
              <Accordian title='Daily'/>
              {dailys}

         <View style={styles.row}>
           <Input
            value={this.state.daily}
            onChangeText={(text)=>this.setState({daily:text})}
            returnKeyType='go'
            onSubmitEditing={()=>this.addDaily()}
            enablesReturnKeyAutomatically={true}
            placeholder='E.g. watch CNN news'
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.daily>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addDaily()}
          />*/}
         </View>

         <CompleteTask>
            <DailyComplete/>
         </CompleteTask>
         </>
        </Card>
           
        </Container>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        id:state.newDaily,
        dailys:state.listDailys,
        checked:state.markDailyDone,
        unchecked:state.markDailyUndone,
        delete:state.deleteDaily,
        dropCallId:state.dropCallTask
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveDaily:(daily)=>despatch(addDaily(daily)),
        fetchData:()=>despatch(fetchData()),
        checkedDone:(id)=>despatch(checkedDailyDone(id)),
        checkedUndone:(id)=>despatch(checkedDailyUndone(id)),
        deleteDaily:(id)=>despatch(deleteDaily(id)),
        fetchDoneDaily:()=>despatch(fetchDoneDaily()),
        callTaskDrop:(id)=>despatch(callTaskDrop(id))
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
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

export default connect(mapStateToProps,mapDespatchToProps)(DailyScreen);