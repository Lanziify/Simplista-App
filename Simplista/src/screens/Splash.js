import {StyleSheet, Text, View, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import React, { useEffect } from 'react';
import PushNotification from 'react-native-push-notification';

export default function Splash({navigation}) {
    useEffect(()=>{
        createChannels();
        setTimeout(()=>{
            navigation.replace('Home')
        }, 2000)
    })

    const createChannels = () => {
        PushNotification.createChannel({
            channelId: "task-channel",
            channelName: "Task Channel"
        })
    }
  return (
    <LinearGradient colors={['#F4CDBB','#A9DFE2']} style={styles.body}>
      <Image
      style={styles.logo}
      source={require('../../assets/imgs/Logo.png')} />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 99.24,
    height: 188,
  }
});
