import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage'
import {fetchDoneTodo} from '../actions/todoAction';
import Color from '../utilis/colors';

class TodoComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneTodo();
    }

    render(){
        const doneTodo=this.props.listTodoDone.map((todo)=>(
            <ListItem
              key={todo.id}
              title={todo.todo}
              titleProps={{style:styles.doneStyle}}
            />
        ))
        return(
          <Container>
              {this.props.listTodoDone.length>-1?<Card>{doneTodo}</Card>:<EmptyTaskMessage task='Todo'/>}
          </Container>
        );
    }
}

const mapStateToProps=(state)=>{
    return{
        listTodoDone:state.listDoneTodo
    }
}

const mapDespatchToProps=(despatch)=>{
    return{
      fetchDoneTodo:()=>despatch(fetchDoneTodo())
    }
}

const styles = StyleSheet.create({
    doneStyle:{
        color:Color.CHECKED_COLOR,
        textDecorationLine:'line-through',
    },
})

export default connect(mapStateToProps,mapDespatchToProps)(TodoComplete);