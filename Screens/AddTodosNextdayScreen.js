
import React,{Component} from 'react';
import {StyleSheet,View} from 'react-native';
import {Input,Icon,ListItem,Card} from 'react-native-elements';
import {connect} from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import {addTodoTomorrow,fetchTodosTomorrow} from '../actions/todoAction';

class AddTodosNextdayScreen extends Component{

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
              titleProps={{style:todo.done?styles.doneStyle:styles.undoneStyle}}
              bottomDivider
            />
          ))
        
        return(
         <Container>
          <Card>
           {todos}
          </Card>
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
      </Container>
        );
    }


}

const mapStateToProps =(state)=>{
    return {
      id: state.newTodoTomorrow,
      Todos: state.listTodosTomorrow,
    }
  }
  
  const mapDespatchToProps =(despatch)=>{
    return{
      saveTodo:(todo)=>despatch(addTodoTomorrow(todo)),
      fetchTodos:()=>despatch(fetchTodosTomorrow())
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

  export default connect(mapStateToProps,mapDespatchToProps)(AddTodosNextdayScreen);