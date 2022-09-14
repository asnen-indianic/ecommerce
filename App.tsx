import React, {FC, useEffect} from 'react';
import MainNavigation from './App/Navigation';
const App: FC = () => {
  
  //   const handleDynamicLink = link => {
  //     console.log("getting link:- ", link);
  // setTimeout(()=>{
  //   // navigate('CategoryList',{})
  // },1000)

  //   };

  //   useEffect(() => {
  //     const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
  //     dynamicLinks().getInitialLink().then(handleDynamicLink);
  //     return () => unsubscribe();
  //   }, []);

  return <MainNavigation />;
};

export default App;
