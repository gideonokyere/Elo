import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon,ListItem,Card} from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import { addGoto, fetchGoto,checkedGoToDone,checkedGotoUndone } from '../actions/gotoAction';

class GoToScreen extends Component {
   state = {
      goto: ''
   }

   UNSAFE_componentWillMount(){
      this.props.fetchData();
   }

   addGoto = () => {
      const { goto } = this.state;
      this.props.saveGoto(goto);
      this.setState({ goto: '' });
      this.props.fetchData();
   }

   checkedGotoDone=(id)=>{
     this.props.checkedGotoDone(id);
     this.props.fetchData();
   }

   checkedGotoUndone=(id)=>{
      this.props.checkedGotoUndone(id);
      this.props.fetchData();
   }

   render() {
       const gotos=this.props.gotos.map((goto)=>(
          <ListItem
             key={goto.id}
             title={goto.goto}
             titleProps={{style:goto.done?styles.doneStyle:styles.undoneStyle}}
             onPress={()=>goto.done?this.checkedGotoUndone(goto.id):this.checkedGotoDone(goto.id)}
             bottomDivider
          />
       ))
      return (
         <Container>
            <Card>
            {gotos}
            </Card>
            <View style={styles.row}>
               <Input
                  value={this.state.goto}
                  onChangeText={(text) => this.setState({ goto: text })}
                  onSubmitEditing={()=>this.addGoto()}
                  enablesReturnKeyAutomatically={true}
                  placeholder=' E.g. office'
               />
               {/**<Icon
                  name='add'
                  disabled={!this.state.goto > 0}
                  color={Color.PRIMARY_COLOR} size={30}
                  onPress={() => this.addGoto()}
               />*/}
            </View>
         </Container>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      newCall: state.newCall,
      gotos: state.listGotos,
      checked: state.markGotoDone,
      unchecked: state.markGotoUndone
   }
}

const mapDespatchToProps = (despatch) => {
   return {
      saveGoto: (goto) => despatch(addGoto(goto)),
      fetchData: () => despatch(fetchGoto()),
      checkedGotoDone:(id)=>despatch(checkedGoToDone(id)),
      checkedGotoUndone:(id)=>despatch(checkedGotoUndone(id))
   }
}

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      paddingRight: 18,
   },
   doneStyle:{
      color:Color.CHECKED_COLOR,
      textDecorationLine:'line-through',
  },
  undoneStyle:{
      fontWeight:'normal'
  }
})

export default connect(mapStateToProps,mapDespatchToProps)(GoToScreen);