import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Icon,ListItem } from 'react-native-elements';
import { connect } from 'react-redux';
import Container from '../components/Constainer';
import Color from '../utilis/colors';
import { addGoto, fetchGoto } from '../actions/gotoAction';

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

   render() {
       const gotos=this.props.gotos.map((goto)=>(
          <ListItem
             key={goto.id}
             title={goto.goto}
             bottomDivider
          />
       ))
      return (
         <Container>
            {gotos}
            <View style={styles.row}>
               <Input
                  value={this.state.goto}
                  onChangeText={(text) => this.setState({ goto: text })}
                  placeholder=' E.g. office'
               />
               <Icon
                  name='add'
                  disabled={!this.state.goto > 0}
                  color={Color.PRIMARY_COLOR} size={30}
                  onPress={() => this.addGoto()}
               />
            </View>
         </Container>
      )
   }
}

const mapStateToProps = (state) => {
   return {
      newCall: state.newCall,
      gotos: state.listGotos
   }
}

const mapDespatchToProps = (despatch) => {
   return {
      saveGoto: (goto) => despatch(addGoto(goto)),
      fetchData: () => despatch(fetchGoto())
   }
}

const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      paddingRight: 18,
   }
})

export default connect(mapStateToProps,mapDespatchToProps)(GoToScreen);