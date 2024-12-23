import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ListOfAvatars } from '../components/ListOfAvatars';
import { ListOfCards } from '../components/ListOfCards';

export const Feed = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{
          backgroundColor: "rgba(255,255,255, 0.85)",
          height: 100,
          width: "100%",
          zIndex: 100,
        }}>
        <ListOfAvatars />
        <ListOfCards />
      </View>
    </SafeAreaView>
  )
}
