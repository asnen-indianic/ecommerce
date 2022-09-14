import React,{FC,useState,useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {navigationRef} from './RootNavigation'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigator from './AuthNavigator';
import auth from '@react-native-firebase/auth';
import AppNavigater from './AppNavigater';
import linking from '../linking';

const Stack = createNativeStackNavigator()

const MainNavigation: FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<string>('');
  const onAuthStateChanged = user => {
    setUser(user);
    if (initializing) setInitializing(false);
  };
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {!!user ? (
          <Stack.Screen name="app_navigator" component={AppNavigater} />
        ) : (
          <Stack.Screen name="auth_navigator" component={AuthNavigator} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};
export default MainNavigation;
