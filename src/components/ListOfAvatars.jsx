import React from  'react';
import { View, Text, FlatList } from 'react-native';
import { ListHeaderComponent } from './ListHeaderComponent';

const arrayOfAvatars = [
    {
        id: 1,
        url: '',
    },
    {
        id: 2,
        url: '',
    },
    {
        id: 3,
        url: '',
    },
];

export const ListOfAvatars = () => {
    const renderItem = ({ item }) => {
        return (
            <View>
                <Text>{item.id}</Text>
            </View>
        );
    };

    return (
        <FlatList
            data={arrayOfAvatars}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            horizontal
            ListHeaderComponent={<ListHeaderComponent />}
        />
    );
};