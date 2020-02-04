import React,{Component} from 'react';
import {StyleSheet} from 'react-native';
import {ListItem,Card,Icon} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import EmptyTaskMessage from '../components/EnptyTaskMessage'
import {fetchDoneTodo,fetchTodos,todoUndrop} from '../actions/todoAction';
import Color from '../utilis/colors';

class TodoComplete extends Component{

    UNSAFE_componentWillMount(){
        this.props.fetchDoneTodo();
    }

    undropMyTodo=(id)=>{
       this.props.todoUndrop(id);
       this.props.fetchTodos();
       this.props.fetchDoneTodo();
    }

    render(){
        const doneTodo=this.props.listTodoDone.map((todo)=>(
            <ListItem
              key={todo.id}
              title={todo.todo}
              rightIcon={<Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.undropMyTodo(todo.id)}/>}
              titleProps={{style:todo.done==1?styles.doneStyle:styles.undoneStyle}}
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
      fetchDoneTodo:()=>despatch(fetchDoneTodo()),
      todoUndrop:(id)=>despatch(todoUndrop(id)),
      fetchTodos:()=>despatch(fetchTodos())
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

export default connect(mapStateToProps,mapDespatchToProps)(TodoComplete);