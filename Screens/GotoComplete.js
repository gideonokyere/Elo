import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem,Icon} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDoneGoto,gotoUndrop,fetchGoto} from '../actions/gotoAction'

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';


class GotoComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneGoto()
    }

    undropMyGoto=(id)=>{
        this.props.gotoUndrop(id);
        this.props.fetchDoneGoto();
        this.props.fetchGoto()
    }

    render(){
        const doneGoto = this.props.listDoneGoto.map((goto)=>(
            <ListItem
               key={goto.id}
               title={goto.goto}
              titleProps={{style:goto.done==1?styles.doneStyle:styles.undoneStyle}}
              rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyGoto(goto.id)}/>}
              topDivider
            />
        ))

        return(
          <Container>
             {this.props.listDoneGoto.length>-1?<Card>{doneGoto}</Card>:<EmptyTaskMessage task='Go to'/>}
          </Container>
        )
    }
}

const mapStateToProps=(state)=>{
    return{
        listDoneGoto:state.listDoneGoto
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
        fetchDoneGoto:()=>despatch(fetchDoneGoto()),
        gotoUndrop:(id)=>despatch(gotoUndrop(id)),
        fetchGoto:(id)=>despatch(fetchGoto(id))
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

export default connect(mapStateToProps,mapDespatchToProps)(GotoComplete)