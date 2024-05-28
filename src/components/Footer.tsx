import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {Favorite, FavoriteIcon, Home, HomeIcon} from '../assets/svg';

const Footer = ({data, navigation}: {data: string; navigation: any}) => {
  return (
    <View className=" dark:bg-blue-500 py-4 p-2 flex flex-row justify-around">
      <TouchableOpacity
        onPress={() => navigation.navigate('Anime')}
        className="text-lg text-white items-center">
        {data == 'Anime' ? (
          <Home width={30} height={30} />
        ) : (
          <HomeIcon width={30} height={30} />
        )}
        <Text>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('AnimeFavorite')}
        className="text-lg text-white items-center">
        {data == 'AnimeFavorite' ? (
          <Favorite width={30} height={30} />
        ) : (
          <FavoriteIcon width={30} height={30} />
        )}
        <Text>Favorite</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({});
