import  React,{FC} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  ProductsList,
  CategoryList,
  AddPost,
  HomePage,
  Chat,
  UserHomePage,
  HeaderWork,
  ProductsDetails,
  Cart,
  ScreenSelect,
} from '../Screens';
import FBConfig from '../Screens/App/FBConfig';
import Screens from '../Screens/Screens';
export type AppStackParamList = {
  ProductsList: undefined;
  FBConfig: undefined;
  CategoryList: undefined;
  AddPost: undefined;
  HomePage: undefined;
  UserHomePage: undefined;
  HeaderWork: undefined;
  ProductsDetails: undefined;
  Cart:undefined;
  ScreenSelect:undefined;
  Chat:undefined;
  
};
const Stack = createNativeStackNavigator<AppStackParamList>()
const ApphNavigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName={Screens.ScreenSelect}
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={Screens.ScreenSelect} component={ScreenSelect} />

      <Stack.Screen name={Screens.ProductsList} component={ProductsList} />
      <Stack.Screen name={Screens.FBConfig} component={FBConfig} />
      <Stack.Screen
        name={Screens.CategoryList}
        component={CategoryList}
      />
      <Stack.Screen name={Screens.AddPost} component={AddPost} />
      <Stack.Screen name={Screens.HomePage} component={HomePage} />
      <Stack.Screen
        name={Screens.UserHomePage}
        component={UserHomePage}
      />
        <Stack.Screen
        name={Screens.HeaderWork}
        component={HeaderWork}
      />
       <Stack.Screen
        name={Screens.ProductsDetails}
        component={ProductsDetails}
      />
        <Stack.Screen
        name={Screens.Cart}
        component={Cart}
      />
       <Stack.Screen
        name={Screens.Chat}
        component={Chat}
      />
    </Stack.Navigator>
  );
};
export default ApphNavigation;