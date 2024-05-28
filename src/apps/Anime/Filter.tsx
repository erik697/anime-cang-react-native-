import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
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
  getList,
  getListFilter,
  getListPage,
  getListRecomendation,
  getListTop,
} from '../../apis/Get';
import {LoadingAnimation} from '../../assets/gif';
import Footer from '../../components/Footer';

const Anime = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [genre, setGenre] = useState([]);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [filterName, setFilterName] = useState('' + route.params.title);
  const [currentPage, setCurrentPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const getData = async () => {
    setLoading2(true);
    let dat = await getFilter(route.params.url);
    console.log('ini dat : ', dat);
    setData(dat.data);
    setCurrentPage(dat.pagination.current_page);
    setNextPage(dat.pagination.has_next_page);
    setLoading2(false);
  };

  const getNewData = async url => {
    setLoading2(true);
    let dat = await getFilter(url);
    console.log('ini dat : ', dat);
    setData(dat.data);
    setCurrentPage(dat.pagination.current_page);
    setNextPage(dat.pagination.has_next_page);
    setLoading2(false);
  };

  const getDataGenre = async () => {
    let dat = await getGenre();
    setGenre(dat.data);
  };

  const listData = async () => {
    // "has_next_page": true,
    // "current_page": 1,
    setLoading(true);
    let next = currentPage + 1;
    let dat = await getListFilter(route.params.url, next.toString());
    // console.log('ini dat : ', dat);
    setData([...data, ...dat.data]);
    setCurrentPage(dat.pagination.current_page);
    setNextPage(dat.pagination.has_next_page);
    setLoading(false);
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

      <TouchableOpacity
        onPress={() => {
          setOpen(!open);
        }}
        className={`p-2 mx-4 my-2 ml-auto w-16 rounded-md  inline items-center ${
          open ? 'bg-red-500' : 'bg-blue-500'
        }`}>
        <Text className="text-white">{open ? 'Close' : 'Search'}</Text>
      </TouchableOpacity>

      <ScrollView style={[{flex: 1}, !open ? {display: 'none'} : {}]}>
        <View className="h-1/2 w-full">
          <View className="flex flex-row mx-4 mb-4">
            <TextInput
              value={title}
              onChangeText={val => setTitle(val)}
              className="w-4/5 border-b border-black"
            />
            <TouchableOpacity
              className="mt-auto"
              onPress={() => {
                getNewData('https://api.jikan.moe/v4/anime?q=' + title);
                setOpen(false);
                setFilterName(title);
                // navigation.navigate('AnimeFilter', {
                //   url: 'https://api.jikan.moe/v4/anime?q=' + title,
                //   title: title,
                // });
                // alert(title);
              }}>
              <Text className="py-1 px-2 bg-blue-500 text-white ml-2">Go</Text>
            </TouchableOpacity>
          </View>

          <View className="mx-4">
            <Text>By Genre</Text>
            {loading2 ? (
              <View className="flex">
                <Image
                  source={LoadingAnimation}
                  className="w-20 h-20 mx-auto "
                />
              </View>
            ) : (
              <View className="flex flex-row flex-wrap">
                {genre.map(data => {
                  return (
                    <TouchableOpacity
                      onPress={() => {
                        setOpen(false);
                        setFilterName(data.name);
                        getNewData(
                          'https://api.jikan.moe/v4/anime?genres=' +
                            data.mal_id,
                        );
                      }}
                      className=" m-[1px] bg-slate-300 rounded-md">
                      <Text className="mx-2 my-1 ">{data.name}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            )}
          </View>
        </View>
      </ScrollView>

      {/* list content start */}
      {/* <View className="p-2">
          <Text className="text-xl font-bold">Recomend Anime</Text>
        </View>
        <ScrollView horizontal={true} style={{flex: 1}}>
          <View className="flex flex-row m-2 overflow-scroll">
            {data?.map(data => {
              return <ListAnimeX data={data} navigation={navigation} />;
            })}
          </View>
        </ScrollView> */}
      {/* list content end */}

      {/* list content start */}
      <ScrollView
        style={{flex: 1}}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View className="p-2">
          <Text className="text-xl font-bold">Search : {filterName}</Text>
        </View>
        {data.length > 0 ? (
          <View className="flex flex-row flex-wrap m-2 overflow-scroll">
            {data?.map(data => {
              return <ListAnime data={data} navigation={navigation} />;
            })}
          </View>
        ) : (
          <View className="flex">
            <Image source={LoadingAnimation} className="w-20 h-20 mx-auto " />
          </View>
        )}

        {nextPage && !loading ? (
          <TouchableOpacity
            onPress={() => listData()}
            className="bg-blue-500 mb-6 mx-auto rounded-xl">
            <Text className="px-4 py-2 text-white">More</Text>
          </TouchableOpacity>
        ) : loading ? (
          <View className="flex">
            <Image source={LoadingAnimation} className="w-20 h-20 mx-auto " />
          </View>
        ) : null}
      </ScrollView>
      {/* list content end */}
      <Footer navigation={navigation} data="Anime" />
    </View>
  );
};

export default Anime;

const styles = StyleSheet.create({});
