import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Card,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import {checkedCallUndone,listCallDone,callUndrop,fetchCalls} from '../actions/callAction';
import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Accordian from '../components/Accordian';
import Color from '../utilis/colors';

class CallComplete extends Component{

    UNSAFE_componentWillMount=async()=>{
       await this.props.donefetchCalls()
    }

    undropMyCall=(id)=>{
        this.props.undropCall(id);
        this.props.donefetchCalls();
        this.props.fetchCalls();
    }

    render(){
        const calls = this.props.doneCalls.map((call)=>(
            <ListItem
                key={call.id}
                title={call.name}
                titleProps={{style:call.done==1?styles.doneStyle:styles.undoneStyle}}
                rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyCall(call.id)}/>}
                topDivider
            />
        ))
        return(
          <Container>
                {this.props.doneCalls.length>-1?<>
                      {calls}
                 </>:
                <EmptyTaskMessage task='call'/>}
          </Container>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        id:state.markCallUndone,
        doneCalls:state.listCallDone
    }
}

const mapDispatchToProps=(dispatch)=>{
    return{
        makeUndone:(id)=>dispatch(checkedCallUndone(id)),
        donefetchCalls:()=>dispatch(listCallDone()),
        undropCall:(id)=>dispatch(callUndrop(id)),
        fetchCalls:()=>dispatch(fetchCalls())
    }
}

    const styles = StyleSheet.create({
        doneStyle:{
            color:Color.CHECKED_COLOR,
            textDecorationLine:'line-through',
        },
        undoneStyle:{
            fontWeight:'normal'
        }
})

export default connect(mapStateToProps,mapDispatchToProps)(CallComplete);