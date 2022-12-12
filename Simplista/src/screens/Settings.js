import {StyleSheet, View, Text} from 'react-native';
import React from 'react'

export default function Settings() {
  return (
    <View style={styles.body}>
      <Text>Settings</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
