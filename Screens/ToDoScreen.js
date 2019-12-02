import React,{Component} from 'react';
import {Text,StyleSheet,View} from 'react-native';
import {Input,Icon,ListItem} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addTodo,fetchTodos} from '../actions/todoAction';

class ToDoScreen extends Component{

  state={
    todo:''
  }

  UNSAFE_componentWillMount(){
    this.props.fetchTodos();
  }

  addToDo=()=>{
    const {todo} = this.state;
    this.props.saveTodo(todo);
    this.setState({todo:''});
    this.props.fetchTodos();
  }

   render(){
      const todos = this.props.Todos.map((todo)=>(
        <ListItem
          key={todo.id}
          title={todo.todo}
          bottomDivider
        />
      ))

    return(
      <Container>
           {todos}
          <View style={styles.row}>
          <Input
            value={this.state.todo}
            onChangeText={(text)=>this.setState({todo:text})}
            placeholder='E.g. post letters'
          />
          <Icon 
            name='add'
            disabled={!this.state.todo>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addToDo()}
          />
        </View>
      </Container>
    );
   }
}

const mapStateToProps =(state)=>{
  return {
    id: state.newTodo,
    Todos: state.listTodos
  }
}

const mapDespatchToProps =(despatch)=>{
  return{
    saveTodo:(todo)=>despatch(addTodo(todo)),
    fetchTodos:()=>despatch(fetchTodos())
  }
}

const styles = StyleSheet.create({
  row:{
    flexDirection:'row',
    paddingRight:18,
  }
})

export default connect(mapStateToProps,mapDespatchToProps)(ToDoScreen);