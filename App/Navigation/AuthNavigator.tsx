import  React,{FC} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Signup,Login } from '../Screens';

export type AuthStackList = {
  Signup: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackList>();

const AuthNavigator: FC = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name={'Signup'} component={Signup} />
      <Stack.Screen name={'Login'} component={Login} />
    </Stack.Navigator>
  );
};

export default AuthNavigator;