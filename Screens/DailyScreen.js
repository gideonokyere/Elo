import React,{Component} from 'react';
import {View,StyleSheet,Platform} from 'react-native';
import {Icon,Input,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addDaily,fetchData,checkedDailyDone,checkedDailyUndone} from '../actions/dailyAction';


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
        this.props.fetchData();
    }

    checkedUndone=(id)=>{
        this.props.checkedUndone(id);
        this.props.fetchData();
    }

    render(){

        const dailys = this.props.dailys.map((daily)=>(
            <ListItem
              key={daily.id}
              title={daily.daily}
              titleProps={{style:daily.done?styles.doneStyle:styles.undoneStyle}}
              onPress={()=>daily.done?this.checkedUndone(daily.id):this.checkedDone(daily.id)}
              bottomDivider
            />
        ))

        return(
           <Container>
            <Card>   
              {dailys}
            </Card>
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
        </Container>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        id:state.newDaily,
        dailys:state.listDailys,
        checked:state.markDailyDone,
        unchecked:state.markDailyUndone
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveDaily:(daily)=>despatch(addDaily(daily)),
        fetchData:()=>despatch(fetchData()),
        checkedDone:(id)=>despatch(checkedDailyDone(id)),
        checkedUndone:(id)=>despatch(checkedDailyUndone(id))
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

export default connect(mapStateToProps,mapDespatchToProps)(DailyScreen);