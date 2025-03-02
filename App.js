import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Loader from './Components/Loader';
import Menu from './Components/Menu';        // Water screen
import EditProfile from './Components/EditProfile';

import AddWater from './Components/AddWater'; // Экран добавления воды
import { EventsList, EventDetails } from './Components/Events';
import { AudioProvider } from './Components/AudioContext';
import CustomTabBar from './Components/CustomTabBar';
import PersonalInfoStep1 from './Components/PersonalInfoStep1';
import PersonalInfoStep2Weight from './Components/PersonalInfoStep2Weight';
import PersonalInfoStep3Height from './Components/PersonalInfoStep3Height';
import PersonalInfoStep4Goal from './Components/PersonalInfoStep4Goal';
import MapScreen from './Components/Map';
import Profile from './Components/Profile';
import Settings from './Components/Settings';
import { ReminderProvider } from './Components/ReminderContext';
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

import { ProfileProvider } from './Components/ProfileContext';
function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
  <Tab.Screen
  name="WaterTab"
  component={Menu}
  options={{
    // Если стоит true, экран будет размонтирован при уходе
    // Нужно убрать или поставить false:
    unmountOnBlur: false,
  }}
/>
<Tab.Screen
        name="MapTab"
        component={MapScreen}
        options={{
          unmountOnBlur: false,
        }}
      />
  
  <Tab.Screen
        name="EventsTab"
        component={EventsList}
        options={{
          unmountOnBlur: false,
        }}
      />
       <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          unmountOnBlur: false,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [loaderEnded, setLoaderEnded] = useState(false);

  return (
    
    <AudioProvider>
      <ProfileProvider>
      <ReminderProvider>
    <NavigationContainer>
      {!loaderEnded ? (
        <Loader onEnd={() => setLoaderEnded(true)} />
      ) : (
        <Stack.Navigator 
        initialRouteName="PersonalInfoStep1" 
        screenOptions={{ headerShown: false }}
      >
       
        <Stack.Screen name="PersonalInfoStep1" component={PersonalInfoStep1} />
        <Stack.Screen name="PersonalInfoStep2Weight" component={PersonalInfoStep2Weight} />
        <Stack.Screen name="PersonalInfoStep3Height" component={PersonalInfoStep3Height} />
        <Stack.Screen name="PersonalInfoStep4Goal" component={PersonalInfoStep4Goal} />
      
        {/* Далее можно добавить общий Tabs */}
        <Stack.Screen name="Tabs" component={MyTabs} />
        <Stack.Screen name="AddWater" component={AddWater} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
      )}
    </NavigationContainer>
    </ReminderProvider>
    </ProfileProvider>
    </AudioProvider>
  );
}