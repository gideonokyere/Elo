import React,{Component} from  'react';
import {View,StyleSheet,Alert} from 'react-native';
import {Icon,Input,ListItem,Card} from  'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Accordian from '../components/Accordian';
import CompleteTask from '../components/CompleteTask';
import VisitComplete from '../Screens/VisitComplete';
import Color from '../utilis/colors';
import {fetchData,addVisit,checkedVisitDone,checkedVisitUndone,deleteVisit,fetchDoneVisit,visitDrop} from '../actions/visitAction';


class VisitScreen extends Component{

    state={
        visit:''
    }

    UNSAFE_componentWillMount(){
        this.props.fetchData();
    }

    addVisit=()=>{
        const {visit} = this.state;
        this.props.saveVisit(visit);
        this.setState({visit:''});
        this.props.fetchData()
    }

    checkedVisitDone=(id)=>{
        this.props.checkedVisitDone(id);
        this.props.fetchData();
        this.props.fetchDoneVisit()
    }

    checkedVisitUndone=(id)=>{
        this.props.checkedVisitUndone(id);
        this.props.fetchData();
    }

    deleteMyVisit=(id)=>{
        this.props.deleteVisit(id);
        this.props.fetchData()
    }

    dropMyVisit=(id)=>{
        this.props.visitDrop(id);
        this.props.fetchData();
        this.props.fetchDoneVisit();
    }

    render(){

        const visits = this.props.visits.map((visit)=>(
            
               <ListItem
                  key={visit.id}
                  title={visit.visit}
                  titleProps={{style:visit.done?styles.doneStyle:styles.undoneStyle}}
                  onPress={()=>visit.done?this.checkedVisitUndone(visit.id):this.checkedVisitDone(visit.id)}
                  rightIcon={
                  <>
                  <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
                      'Confirmation',
                      'Remove Task ?',
                      [
                          {text:'YES',onPress:()=>this.deleteMyVisit(visit.id)},
                          {text:'NO'}
                      ]
                  )}/>
                  <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyVisit(visit.id)}/>
                  </>
                  }
                  bottomDivider
              />
        ))

        return(
     <Container>
         <Card containerStyle={styles.cardStyle}>
          <>
          <Accordian title='Visit'/>
          {visits}

          <View style={styles.row}>
           <Input
            value={this.state.visit}
            onChangeText={(text)=>this.setState({visit:text})}
            onSubmitEditing={()=>this.addVisit()}
            enablesReturnKeyAutomatically={true}
            placeholder='E.g. Grace'
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.visit>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addVisit()}
          />*/}
         </View>
          <CompleteTask>
              <VisitComplete/>
          </CompleteTask>
          </>
         </Card>
    </Container>
        );
    }
}

const mapStateToProps =state=>{
    return{
        id:state.newVisit,
        visits:state.listVisits,
        checked: state.markVisitDone,
        unchecked:state.markVisitUndone,
        delete:state.deleteVisit
    }
}

const mapDespatchToProps=despatch=>{
   return{
    saveVisit:(visit)=>despatch(addVisit(visit)),
    fetchData:()=>despatch(fetchData()),
    checkedVisitDone:(id)=>despatch(checkedVisitDone(id)),
    checkedVisitUndone:(id)=>despatch(checkedVisitUndone(id)),
    deleteVisit:(id)=>despatch(deleteVisit(id)),
    fetchDoneVisit:()=>despatch(fetchDoneVisit()),
    visitDrop:(id)=>despatch(visitDrop(id))
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

  export default connect(mapStateToProps,mapDespatchToProps)(VisitScreen);