import React, {useEffect} from 'react';
import {View, StatusBar} from 'react-native';
import Colors from '../../../Colors';
import Header from '../../../CommonViewUtilities/Header';
import { navigationRef } from '../../../Navigation/RootNavigation';


const Chat = () => {
  return (
    <View style={{flex: 1, backgroundColor: Colors.white}}>
      <StatusBar backgroundColor={Colors.white} />
      <Header simpleView={true}
        goBack={() => navigationRef.goBack()}
        title={'Remote Configration'}
      />
    </View>
  );
};
export default Chat;
