import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import ListAnime from '../../components/contents/ListAnime';
import ListAnimeX from '../../components/contents/ListAnimeX';
import {
  getFilter,
  getGenre,
  getListRecomendation,
  getListTop,
} from '../../apis/Get';

const Filter = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const getData = async () => {
    alert(route.params.url);
    let dat = await getFilter(route.params.url);
    console.log('ini dat : ', dat);
    setData(dat.data);
  };

  const getDataGenre = async () => {
    let dat = await getGenre();
    setGenre(dat.data);
  };

  useEffect(() => {
    getData();
    getDataGenre();
  }, []);

  return (
    <View className="w-full dark:bg-black" style={{flex: 1}}>
      {/* banner start */}
      <View className="py-4 px-2 bg-blue-400 dark:bg-blue-600">
        <Text className="text-white font-bold text-xl">Anime Cang</Text>
      </View>

      {/* banner end */}

      <TouchableOpacity className="p-2 mx-4 my-2 ml-auto w-16 rounded-md bg-blue-500 inline items-center">
        <Text className="text-white">Filter</Text>
      </TouchableOpacity>

      <ScrollView style={{flex: 1}}>
        <View className="h-1/2">
          <Text>Cari</Text>

          <Text>Pilih Genre</Text>
          <View className="flex flex-row flex-wrap">
            {genre.map(data => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate('AnimeFilter', {url: data.url});
                  }}
                  className=" m-[1px] bg-slate-300 rounded-md">
                  <Text className="mx-2 my-1 ">{data.name}</Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </ScrollView>

      {/* list content start */}
      <ScrollView style={{flex: 1}}>
        {/* list content start */}

        <View className="flex flex-row flex-wrap m-2 overflow-scroll">
          {data?.map(data => {
            return <ListAnime data={data} navigation={navigation} />;
          })}
        </View>
      </ScrollView>
      {/* list content end */}
      <View className="bg-blue-500 py-4 p-2 flex flex-row justify-around">
        <Text className="text-lg text-white">Home</Text>
        <Text className="text-lg text-white">Home</Text>
      </View>
    </View>
  );
};

export default Filter;

const styles = StyleSheet.create({});
