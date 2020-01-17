import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon,ListItem,Card} from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import { addGotoTomorrow, fetchGotoTomorrow} from '../actions/gotoAction';

class AddGotoNextdayScreen extends Component{

    state = {
        goto: ''
     }
  
     UNSAFE_componentWillMount(){
        this.props.fetchTomoData();
     }
  
     addGoto = () => {
        const { goto } = this.state;
        this.props.saveTomoGoto(goto);
        this.setState({ goto: '' });
        this.props.fetchTomoData();
     }

    render(){

        const gotos=this.props.gotosTomo.map((goto)=>(
            <ListItem
               key={goto.id}
               title={goto.goto}
               titleProps={{style:goto.done?styles.doneStyle:styles.undoneStyle}}
               bottomDivider
            />
         ))

        return(
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
       id: state.newGotoTomorrow,
       gotosTomo: state.listGotosTomorrow
    }
 }
 
 const mapDespatchToProps = (despatch) => {
    return {
       saveTomoGoto: (goto) => despatch(addGotoTomorrow(goto)),
       fetchTomoData: () => despatch(fetchGotoTomorrow())
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

 export default connect(mapStateToProps,mapDespatchToProps)(AddGotoNextdayScreen);