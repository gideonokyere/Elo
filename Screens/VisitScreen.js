import React,{Component} from  'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem} from  'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {fetchData,addVisit,checkedVisitDone,checkedVisitUndone} from '../actions/visitAction';


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
    }

    checkedVisitUndone=(id)=>{
        this.props.checkedVisitUndone(id);
        this.props.fetchData();
    }

    render(){

        const visits = this.props.visits.map((visit)=>(
            
               <ListItem
                  key={visit.id}
                  title={visit.visit}
                  titleProps={{style:visit.done?styles.doneStyle:styles.undoneStyle}}
                  onPress={()=>visit.done?this.checkedVisitUndone(visit.id):this.checkedVisitDone(visit.id)}
                  bottomDivider
              />
        ))

        return(
     <Container>
         {visits} 
        <View style={styles.row}>
           <Input
            value={this.state.visit}
            onChangeText={(text)=>this.setState({visit:text})}
            placeholder='E.g. Grace'
          />
          <Icon 
            name='add'
            disabled={!this.state.visit>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addVisit()}
          />
        </View>

    </Container>
        );
    }
}

const mapStateToProps =state=>{
    return{
        id:state.newVisit,
        visits:state.listVisits,
        checked: state.markVisitDone,
        unchecked:state.markVisitUndone
    }
}

const mapDespatchToProps=despatch=>{
   return{
    saveVisit:(visit)=>despatch(addVisit(visit)),
    fetchData:()=>despatch(fetchData()),
    checkedVisitDone:(id)=>despatch(checkedVisitDone(id)),
    checkedVisitUndone:(id)=>despatch(checkedVisitUndone(id))
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

  export default connect(mapStateToProps,mapDespatchToProps)(VisitScreen);