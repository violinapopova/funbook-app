import React, { useState, useEffect, useCallback } from "react";
import { View, FlatList } from "react-native";
import { Card } from "./Card";
import * as SplashScreen from 'expo-splash-screen';
import { requestBase } from "../utils/Constants";

SplashScreen.preventAutoHideAsync();

export const ListOfFavorites = () => {
  const [cardList, setCardList] = useState(null);

  async function fetchCardData() {
    const response = await fetch(requestBase + "/home.json");
    const data = await response.json();
    setCardList(data);
  }

  useEffect(() => {
    fetchCardData();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (cardList) {
      await SplashScreen.hideAsync();
    }
  }, [cardList]);

  if (!cardList) {
    return null;
  }
  const renderItem = ({ item }) => {
    return <Card item={item} />;
  };
  return (
    <View onLayout={onLayoutRootView} style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={cardList.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId}
        showsVerticalScrollIndicator={false}
        snapToInterval={312}
        decelerationRate='fast'
      />
    </View>
  );
};