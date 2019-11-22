/*const CallStack = createStackNavigator(
    {
        Call:CallNav,
        AddCall:{
            screen:AddCallScreen,
            navigationOptions:{
                title:'ADD CALL'
            }
         }
    },
    {
     defaultNavigationOptions:{
         title:'CALL',
         headerTitleStyle:{
             color:Platform.OS==='ios'?'red':'white'
         },
         headerStyle:{
             backgroundColor:Platform.OS==='ios'?'white':'red'
         },
         headerRight:()=>(
             <Icon 
               color={Platform.OS==='ios'?'red':'white'}
               name={Platform.OS=='ios'?'ios-person-add':'md-person-add'}
               size={24}
               iconStyle={{marginRight:20}}
               type='ionicon'
               onPress={()=>NavigationService.navigate('AddCall')}
             />
         )
     }
    }
 );
 
 CallStack.navigationOptions ={
         tabBarLabel:'CALL',
         tabBarIcon:({tintColor})=>(
             <Ionicons name={Platform.OS==='ios'?'ios-call':'md-call'} size={21} color={tintColor}/>
         )
 }
 
 const TodoStack = createStackNavigator({
     ToDo:ToDOScreen
 },{
     defaultNavigationOptions:{
         title:'TODO',
         headerTitleStyle:{
             color:Platform.OS==='ios'?'red':'white'
         },
         headerStyle:{
             backgroundColor:Platform.OS==='ios'?'white':'red'
         },
         headerRight:()=>(
             <Icon 
               color={Platform.OS==='ios'?'red':'white'}
               name={Platform.OS=='ios'?'add-to-list':'add-to-list'}
               size={24}
               iconStyle={{marginRight:20}}
               type='entypo'
             />
         )
     }
 });
 
 TodoStack.navigationOptions={
     tabBarLabel:'TODO',
         tabBarIcon:({tintColor})=>(
         <Ionicons name={Platform.OS==='ios'?'ios-list':'md-list'} size={21} color={tintColor}/>
     )
 }
 
 const GoToStack = createStackNavigator({
     GoTo:GoToScreen
 },{
     defaultNavigationOptions:{
         title:'GOTO',
         headerTitleStyle:{
             color:Platform.OS==='ios'?'red':'white'
         },
         headerStyle:{
             backgroundColor:Platform.OS==='ios'?'white':'red'
         },
         headerRight:()=>(
             <Icon 
               color={Platform.OS==='ios'?'red':'white'}
               name={Platform.OS=='ios'?'add-location':'add-location'}
               size={24}
               iconStyle={{marginRight:20}}
               type='material'
             />
         )
     }
 });
 
 GoToStack.navigationOptions={
         tabBarLabel:'GOTO',
         tabBarIcon:({tintColor})=>(
             <Ionicons name={Platform.OS==='ios'?'ios-map':'md-map'} size={21} color={tintColor}/>
       )
 }
 
 const StudyStack = createStackNavigator({
     Study:StudyScreen
 },{
     defaultNavigationOptions:{
         title:'STUDY',
         headerTitleStyle:{
             color:Platform.OS==='ios'?'red':'white'
         },
         headerStyle:{
             backgroundColor:Platform.OS==='ios'?'white':'red'
         },
         headerRight:()=>(
             <Icon 
               color={Platform.OS==='ios'?'red':'white'}
               name={Platform.OS=='ios'?'library-add':'library-add'}
               size={24}
               iconStyle={{marginRight:20}}
               type='material'
             />
         )
     }
 });
 
 StudyStack.navigationOptions={
     tabBarLabel:'STUDY',
     tabBarIcon:({tintColor})=>(
         <Ionicons name={Platform.OS==='ios'?'ios-book':'md-book'} size={21} color={tintColor}/>
     )
 }
 
 const BuyStack = createStackNavigator({
     Buy:BuyScreen
 },{
 
     defaultNavigationOptions:{
         title:'BUY',
         headerTitleStyle:{
             color:Platform.OS==='ios'?'red':'white'
         },
         headerStyle:{
             backgroundColor:Platform.OS==='ios'?'white':'red'
         },
         headerRight:()=>(
             <Icon 
               color={Platform.OS==='ios'?'red':'white'}
               name={Platform.OS=='ios'?'add-box':'add-box'}
               size={24}
               iconStyle={{marginRight:20}}
               type='material'
             />
         )
     }
 
 });
 
 BuyStack.navigationOptions={
     tabBarLabel:'BUY',
     tabBarIcon:({tintColor})=>(
         <Ionicons name={Platform.OS==='ios'?'ios-cash':'md-cash'} size={21} color={tintColor}/>
     ),
 }
 
 const AppNav = createBottomTabNavigator(
 {
     HOME:{
        screen:HomeScreen,
        navigationOptions:{
           tabBarIcon:({tintColor})=>(
               <Ionicons name={Platform.OS==='ios'?'ios-home':'md-home'} size={21} color={tintColor}/>
           )
        }
     },
     CallStack,
     TodoStack,
     GoToStack,
     StudyStack,
     BuyStack
 },
    {
      initialRouteName:'HOME',
      tabBarOptions:{
         activeBackgroundColor:Platform.OS === 'ios'?'red':'white',
         inactiveBackgroundColor:Platform.OS==='ios'?'white':'red',
         activeTintColor:Platform.OS === 'ios'?'white':'red',
         inactiveTintColor:Platform.OS === 'ios'?'red':'white',
         labelStyle:{fontSize:12,fontWeight:'bold'}
      },
    }
 );
 
 */
 