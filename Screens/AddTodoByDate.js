import React,{Component} from 'react';
import {StyleSheet,View,Alert} from 'react-native';
import {Input,Icon,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addTodoByDates,listTodoByDates,checkTodoDone,checkedTodoUndone,deleteTodo,fetchDoneTodo,todoDrop} from '../actions/todoAction';

class ToDoByDate extends Component{

  state={
    todo:''
  }

  UNSAFE_componentWillMount(){
    this.props.fetchTodos();
  }

  addToDo=()=>{
    const {todo} = this.state;
    const date = this.props.date
    this.props.saveTodo(todo,date);
    this.setState({todo:''});
    this.props.fetchTodos();
  }

  checkedTodoDone=(id)=>{
    this.props.checkedTodoDone(id);
    this.props.fetchTodos();
    this.props.fetchDoneTodo();
  }

  checkedTodoUndone=(id)=>{
    this.props.checkedTodoUndone(id);
    this.props.fetchTodos();
  }

  deleteMyTodo=(id)=>{
    this.props.deleteTodo(id);
    this.props.fetchTodos()
  }

  dropMyTodo=(id)=>{
    this.props.todoDrop(id);
    this.props.fetchTodos()
    this.props.fetchDoneTodo();
  }

   render(){
      const todos = this.props.Todos.map((todo)=>(
        <ListItem
          key={todo.id}
          title={todo.todo}
          titleProps={{style:todo.done?styles.doneStyle:styles.undoneStyle}}
          onPress={()=>todo.done?this.checkedTodoUndone(todo.id):this.checkedTodoDone(todo.id)}
          rightIcon={
          <>
           <Icon name='dots-three-vertical' type='entypo' onPress={()=>Alert.alert(
            'Confirmation',
            'Remove Task ?',
            [
              {text:'YES',onPress:()=>this.deleteMyTodo(todo.id)},
              {text:'NO'}
            ]
          )}/>

            <Icon name='dots-three-horizontal' type='entypo' onPress={()=>this.dropMyTodo(todo.id)}/>
          </>
          }
          bottomDivider
        />
      ))

    return(
      <Container>
         <Card containerStyle={styles.cardStyle}>
           <>
           {todos}
           <View style={styles.row}>
          <Input
            value={this.state.todo}
            onChangeText={(text)=>this.setState({todo:text})}
            placeholder='E.g. post letters'
            onSubmitEditing={()=>this.addToDo()}
            enablesReturnKeyAutomatically={true}
          />
          {/**<Icon 
            name='add'
            disabled={!this.state.todo>0}
            color={Color.PRIMARY_COLOR} size={30} 
            onPress={()=>this.addToDo()}
          />*/}
        </View>
           </>
          </Card>
      </Container>
    );
   }
}

const mapStateToProps =(state)=>{
  return {
    id: state.addTodoByDate,
    Todos: state.listTodoByDate,
    checked:state.markTodoDone,
    unchecked:state.markTodoUndone,
    delete:state.deleteTodo
  }
}

const mapDespatchToProps =(despatch)=>{
  return{
    saveTodo:(todo,date)=>despatch(addTodoByDates(todo,date)),
    fetchTodos:()=>despatch(listTodoByDates()),
    checkedTodoDone:(id)=>despatch(checkTodoDone(id)),
    checkedTodoUndone:(id)=>despatch(checkedTodoUndone(id)),
    deleteTodo:(id)=>despatch(deleteTodo(id)),
    fetchDoneTodo:()=>despatch(fetchDoneTodo()),
    todoDrop:(id)=>despatch(todoDrop(id)),
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
 },
 cardStyle:{
  borderRadius:4
}
})

export default connect(mapStateToProps,mapDespatchToProps)(ToDoByDate);