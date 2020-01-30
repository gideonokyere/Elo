import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {Card,ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import {fetchDoneGoto} from '../actions/gotoAction'

import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage';
import Color from  '../utilis/colors';


class GotoComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneGoto()
    }

    render(){
        const doneGoto = this.props.listDoneGoto.map((goto)=>(
            <ListItem
               key={goto.id}
               title={goto.goto}
              titleProps={{style:styles.doneStyle}}
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
        fetchDoneGoto:()=>despatch(fetchDoneGoto())
    }
}


const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(GotoComplete)