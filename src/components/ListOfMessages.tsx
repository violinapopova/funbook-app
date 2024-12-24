import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import * as SplashScreen from 'expo-splash-screen';
import { requestBase } from "../utils/Constants";

SplashScreen.preventAutoHideAsync();

export const ListOfMessages = ({ conversationId }) => {
  const [messages, setMessages] = useState(null);

  async function fetchMessages() {
    const response = await fetch(
      requestBase + "/messages/" + conversationId + ".json"
    );
    const data = await response.json();
    setMessages(data);
  }

  useEffect(() => {
    fetchMessages();
  }, []);

  if (!messages) {
    return null;
  }

  const renderItem = ({ item }) => {
    return (
      <View
        style={[
          styles.text,
          item.type === "from" ? styles.textTo : styles.textFrom,
        ]}
      >
        <Text style={{}}>{item.text}</Text>
      </View>
    );
  };
  return (
      <View onLayout={onLayoutRootView} style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={messages.messages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        inverted
      />
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    backgroundColor: "#FAFAFA",
    borderBottomRightRadius: 20,
    borderBottomLeftRadius: 20,
    fontSize: 14,
    padding: 10,
    maxWidth: "65%",
    marginVertical: 14,
  },
  textFrom: {
    borderTopLeftRadius: 20,
    alignSelf: "flex-end",
  },
  textTo: {
    borderTopRightRadius: 20,
    alignSelf: "flex-start",
  },
});