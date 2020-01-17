import React,{Component} from  'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem,Card} from  'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {fetchTomorrowData,addTomorrowVisit} from '../actions/visitAction';


class AddVisitNextdayScreen extends Component{

     state={
        visit:''
     }

    UNSAFE_componentWillMount(){
        this.props.fetchTomoData();
    }

    addVisit=()=>{
        const {visit} = this.state;
        this.props.saveVisit(visit);
        this.setState({visit:''});
        this.props.fetchTomoData()
    }

    render(){

        {/**const visits = this.props.Visit.map((visit)=>(
            
            <ListItem
               key={visit.id}
               title={visit.visit}
               titleProps={{style:visit.done?styles.doneStyle:styles.undoneStyle}}
               bottomDivider
           />
        ))*/}

        return(
            <Container>
            <Card>
              
            </Card>
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
   
       </Container>
        );
    }
}

const mapStateToProps =(state)=>{
    return{
        id:state.newTomorrowVisit,
        Visit:state.listTomorrowVisits
    }
}

const mapDespatchToProps=(despatch)=>{
   return{
    saveVisit:(visit)=>despatch(addTomorrowVisit(visit)),
    fetchTomoData:()=>despatch(fetchTomorrowData())
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

export default connect(mapStateToProps,mapDespatchToProps)(AddVisitNextdayScreen)