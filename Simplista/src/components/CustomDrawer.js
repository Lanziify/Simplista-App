import React from 'react';
import {StyleSheet, View, Image, Text, ImageBackground} from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import LinearGradient from 'react-native-linear-gradient';

const CustomDrawer = props => {
  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView {...props}>
        <ImageBackground
          style={{
            margin: 10,
            width: 100,
            height: 100,
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          {/* <LinearGradient
            // start={{x: 0, y: 0.75}}
            // end={{x: 1, y: 0.25}}
            colors={['#F4CDBB', '#A9DFE2']}
            style={[
              {
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 50,
              },
              StyleSheet.absoluteFillObject,
            ]}></LinearGradient> */}
          <Image
            style={{
              //   flex: 1,
              width: 42.23,
              height: 80,
              alignSelf: 'center',
            }}
            source={require('../../assets/imgs/SimplistaLogo.png')}
          />
        </ImageBackground>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <Text style={{textAlign: 'center', margin: 5, fontSize: 10}}>
        Lance | Josh Angela | Vince
      </Text>
      <Text style={{textAlign: 'center', marginBottom: 10, fontSize: 12}}>CS315</Text>
    </View>
  );
};

export default CustomDrawer;
