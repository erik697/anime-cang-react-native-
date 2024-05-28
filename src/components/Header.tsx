import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Header = ({data}: {data: string}) => {
  return (
    <View className="py-4 px-2 bg-blue-400">
      <Text className="text-white font-bold text-xl">{data}</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
