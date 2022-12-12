import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';
import CustomDrawer from './src/components/CustomDrawer';
import Splash from './src/screens/Splash';
import Home from './src/screens/Home';
import Completed from './src/screens/Completed';
import EditList from './src/screens/EditList';
import {Store} from './src/redux/store';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function ScreenStacks() {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props=>
        <CustomDrawer {...props} />
      }
      screenOptions={{
        drawerActiveTintColor: '#F6F6F6',
        drawerInactiveTintColor: '#94B0B2',
        drawerActiveBackgroundColor: '#94B0B2',
        drawerType: 'slide',
        // headerShown: false,
        headerShadowVisible: true,
        swipeEnabled: true,
        geastureEnable: true,
        headerTitle: '',
        headerTintColor: '#324B4C',
        drawerStyle: {
          // backgroundColor: '#324B4C50',
          width: 220,
        },
        headerStyle: {
          height: 45,
        },
        swipeEdgeWidth: 240,
      }
      }>
      <Drawer.Screen name="Reminders" component={Home} />
      <Drawer.Screen name="Completed" component={Completed} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <Provider store={Store}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Splash"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="Splash" component={Splash} />
          <Stack.Screen name="Home" component={ScreenStacks} />
          <Stack.Screen name="List" component={EditList} />
          <Stack.Screen name="Completed" component={Completed} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;
