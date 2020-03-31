import React,{Component} from 'react';
import {Modal, View,StyleSheet,SafeAreaView,Text,TouchableOpacity} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Icon} from 'react-native-elements';
import Color from '../utilis/colors';

//importing components//
import AddCallByDate from '../Screens/AddCallByDate';
import ToDoByDate from '../Screens/AddTodoByDate';
import AddGotoByDate from '../Screens/AddGotoByDate';
import AddBuyByDate from '../Screens/AddBuyByDate';
import AddVisitByDate from '../Screens/AddVisitByDate';
import AddStudyByDate from '../Screens/AddStudyByDate';
import AddProjectByDate from '../Screens/AddProjectByDate';

class Calendars extends Component{
    
    state={
        calendarDisplay:null,
        showModal:false, //dont forget to set it back to false when done
        showModalDate:false,//dont forget to set it back to false when done
        dateSelected:null,
        switchComponent:null
    }
    
     
    
    render(){
        return(
             <View>
              <Icon type='ionicon' name='ios-calendar' color={Color.PRIMARY_COLOR} raised onPress={()=>this.setState({showModal:true})}/>
              
              
               <Modal animated='slide' visible={this.state.showModal}>
                  <SafeAreaView style={styles.modalStyle}>
                     
                     <Calendar
                       showWeekNumbers={false}
                       theme={{
                           todayTextColor:Color.PRIMARY_COLOR,
                           selectedDayBackgroundColor:Color.PRIMARY_COLOR,
                           textDayFontSize:20,
                           textDayFontWeight:'bold',
                           dayTextColor:Color.ACCORDIAL_TITLE,
                           indicatorColor:Color.PRIMARY_COLOR
                       }}
                       onDayPress={(d)=>this.setState({showModalDate:true,dateSelected:d.dateString})}
                     />

                    <Modal
                      visible={this.state.showModalDate}
                      animationType="slide"
                    >
                        <SafeAreaView style={styles.modalStyle}>
                            <View style={styles.touchOp}>
                             
                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'call'})}>
                               <Text style={styles.OpText}>Call</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'todo'})}>
                                <Text style={styles.OpText}>ToDo</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'goto'})}>
                                <Text style={styles.OpText}>GoTo</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'buy'})}>
                                <Text style={styles.OpText}>Buy</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'visit'})}>
                                <Text style={styles.OpText}>Visit</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'study'})}>
                                <Text style={styles.OpText}>Study</Text>
                             </TouchableOpacity>

                             <TouchableOpacity style={styles.OpButton} onPress={()=>this.setState({switchComponent:'projects'})}>
                                <Text style={styles.OpText}>Projects</Text>
                             </TouchableOpacity>

                            </View>
 
                           {
                              this.state.switchComponent==='call'?<AddCallByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='todo'?<ToDoByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='goto'?<AddGotoByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='buy'?<AddBuyByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='visit'?<AddVisitByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='study'?<AddStudyByDate date={this.state.dateSelected}/>
                              :this.state.switchComponent==='projects'?<AddProjectByDate date={this.state.dateSelected}/>
                              :null
                           }

                        </SafeAreaView>

                      {/**Closing button for showModalDate */}
                      <Icon
                        name='close' 
                        raised 
                        onPress={()=>this.setState({showModalDate:false})}
                        color={Color.PRIMARY_COLOR}
                        containerStyle={{backgroundColor:Color.PRIMARY_COLOR}}
                  />

                    </Modal>
                       
                 </SafeAreaView>
                 <Icon 
                  name='close' 
                  raised 
                  onPress={()=>this.setState({showModal:false})}
                  color={Color.PRIMARY_COLOR}
                  containerStyle={{backgroundColor:Color.PRIMARY_COLOR}}
                  />
               </Modal>
               

            </View>
        );
    }
}


const styles = StyleSheet.create({
    modalStyle:{
        flex:2
    },
    touchOp:{
      display:"flex",
      flexDirection:"row",
      flexWrap:"wrap"
    },
    OpButton:{
      backgroundColor:Color.ACCORDIAL_TITLE,
      color:'white',
      height:40,
      width:80,
      margin:10,
      borderRadius:5
    },
    OpText:{
      color:"white",
      textAlign:"center",
      fontWeight:"bold",
      marginTop:10
    }
})

export default Calendars