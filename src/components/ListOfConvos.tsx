import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import { ConversationItem } from "./ConversationItem";
import * as SplashScreen from 'expo-splash-screen';
import { requestBase } from "../utils/Constants";

SplashScreen.preventAutoHideAsync();

export const ListOfConvos = ({ navigation }) => {
  const [conversationsList, setConversationsList] = useState(null);

  async function fetchConversationData() {
    const response = await fetch(requestBase + "/conversations.json");
    const data = await response.json();
    setConversationsList(data);
  }

  useEffect(() => {
    fetchConversationData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (conversationsList) {
      await SplashScreen.hideAsync();
    }
  }, [conversationsList]);

  if (!conversationsList) {
    return null;
  }

  const renderItem = ({ item }) => {
    return <ConversationItem navigation={navigation} item={item} />;
  };

  return (
    <View onLayout={onLayoutRootView} style={{ paddingTop: 30, marginTop: -30, marginBottom: 50 }}>
      <FlatList
        data={conversationsList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        snapToInterval={119}
        decelerationRate='fast'
        ListHeaderComponent={<View style={{ height: 30 }} />}
      />
    </View>
  );
};