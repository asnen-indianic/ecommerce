import  React,{FC} from 'react';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ProductsList,CategoryList,AddPost,HomePage,UserHomePage, HeaderWork, ProductsDetails,Cart } from '../Screens';
import FBConfig from '../Screens/App/FBConfig';
export type AppStackParamList = {
  ProductsList: undefined;
  FBConfig: undefined;
  CategoryList: undefined;
  AddPost: undefined;
  HomePage: undefined;
  UserHomePage: undefined;
  HeaderWork: undefined;
  ProductsDetails: undefined;
  Cart:undefined
  
};
const Stack = createNativeStackNavigator<AppStackParamList>()
const ApphNavigation: FC = () => {
  return (
    <Stack.Navigator
      initialRouteName="ProductsList"
      screenOptions={{headerShown: false}}>
      <Stack.Screen name={'ProductsList'} component={ProductsList} />
      <Stack.Screen name={'FBConfig'} component={FBConfig} />
      <Stack.Screen
        name={'CategoryList'}
        component={CategoryList}
      />
      <Stack.Screen name={'AddPost'} component={AddPost} />
      <Stack.Screen name={'HomePage'} component={HomePage} />
      <Stack.Screen
        name={'UserHomePage'}
        component={UserHomePage}
      />
        <Stack.Screen
        name={'HeaderWork'}
        component={HeaderWork}
      />
       <Stack.Screen
        name={'ProductsDetails'}
        component={ProductsDetails}
      />
        <Stack.Screen
        name={'Cart'}
        component={Cart}
      />
    </Stack.Navigator>
  );
};
export default ApphNavigation;