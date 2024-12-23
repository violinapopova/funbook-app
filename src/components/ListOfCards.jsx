import React, { useState, useEffect } from "react";
import { View, FlatList } from "react-native";
import { Card } from "../components/Card";
import AppLoading from "expo-app-loading";
import { requestBase } from "../utils/Constants";

export const ListOfCards = () => {
  const [cardList, setCardList] = useState(null);

  async function fetchCardData() {
    const response = await fetch(requestBase + "/home.json");
    setCardList(await response.json());
  }

  useEffect(() => {
    fetchCardData();
  }, []);

  if (!cardList) {
    return <AppLoading />;
  }

  const renderItem = ({ item }) => {
    return <Card item={item} />;
  };
  return (
    <View
      style={{
        marginTop: -200,
        paddingHorizontal: 20,
        marginBottom: 160,
      }}
    >
      <FlatList
        data={cardList.reverse()}
        renderItem={renderItem}
        keyExtractor={(item) => item.itemId}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={<View style={{ height: 200 }} />}
        snapToInterval={312}
        decelerationRate='fast'
      />
    </View>
  );
};