import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const ListAnime = ({data, navigation}: {data: any; navigation: any}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('AnimeDetail', {id: data.mal_id});
      }}
      key={data.mal_id}
      className="h-72 w-1/2 mb-2">
      <View className="mx-4 my-0 h-full flex">
        <View className="relative">
          <Image
            src={data.images?.jpg?.image_url}
            className="w-full h-[240px]"
          />
          <View className="absolute bottom-0 left-0 bg-[#00000080]">
            <View className="p-1">
              <Text className="text-white">{data.status}</Text>
              {/* <Text className="text-white">{'ddd'}</Text> */}
            </View>
          </View>
        </View>
        <Text className="mt-1 mb-1 mx-auto text-black">{data.title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ListAnime;

const styles = StyleSheet.create({});
