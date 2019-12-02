import React,{Component} from 'react';
import {View,StyleSheet} from 'react-native';
import {Icon,Input,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addDaily,fetchData} from '../actions/dailyAction';


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

    render(){

        const dailys = this.props.dailys.map((daily)=>(
            <ListItem
              key={daily.id}
              title={daily.daily}
              bottomDivider
            />
        ))

        return(
           <Container>
            {dailys}
           <View style={styles.row}>
           <Input
            value={this.state.daily}
            onChangeText={(text)=>this.setState({daily:text})}
            placeholder='E.g. watch CNN news'
          />
          <Icon 
            name='add'
            disabled={!this.state.daily>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addDaily()}
          />
         </View>
        </Container>
        );
    }
}

const mapStateToProps = (state)=>{
    return{
        id:state.newDaily,
        dailys:state.listDailys
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        saveDaily:(daily)=>despatch(addDaily(daily)),
        fetchData:()=>despatch(fetchData())
    }
}

const styles = StyleSheet.create({
    row:{
      flexDirection:'row',
      paddingRight:18,
    }
  })

export default connect(mapStateToProps,mapDespatchToProps)(DailyScreen);