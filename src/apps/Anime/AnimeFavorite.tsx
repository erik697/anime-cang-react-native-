import {
  Alert,
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
import {openDatabase} from 'react-native-sqlite-storage';
import {FavoriteIcon, HomeIcon} from '../../assets/svg';
import Footer from '../../components/Footer';
import {useFocusEffect} from '@react-navigation/native';

var db = openDatabase(
  {name: 'anime_cang.db', createFromLocation: 1},
  () => {},
  err => {
    console.log(err);
    alert(JSON.stringify(err));
  },
);

const AnimeFavorite = ({navigation, route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    setLoading(true);
    let dat;
    await db.transaction(tx => {
      tx.executeSql('SELECT * FROM collection', [], (tx, results) => {
        console.log('Query completed');

        // Get rows with Web SQL Database spec compliance.

        let dt: any = [];
        var len = results.rows.length;
        for (let i = 0; i < len; i++) {
          let row = results.rows.item(i);
          // console.log(
          //   `Employee name: ${row.user_email}, Dept Name: ${row.anime_image}`,
          // );
          dat = {
            mal_id: row.anime_mal_id,
            images: {jpg: {image_url: row.anime_image}},
            title: row.anime_title,
          };
          dt.push(dat);
        }

        setData(dt);
        console.log('ini data', dt);

        setLoading(false);
        // Alternatively, you can use the non-standard raw method.

        /*
              let rows = results.rows.raw(); // shallow copy of rows Array
  
              rows.map(row => console.log(`Employee name: ${row.name}, Dept Name: ${row.deptName}`));
            */
      });
    });
  };

  // useEffect(() => {
  //   getData();
  // }, [navigation]);

  useFocusEffect(
    React.useCallback(() => {
      getData();
    }, []),
  );

  return (
    <View className="w-full dark:bg-black" style={{flex: 1}}>
      {/* banner start */}
      <View className="py-4 px-2 bg-blue-400 dark:bg-blue-600">
        <Text className="text-white font-bold text-xl">My Favorite</Text>
      </View>

      {/* list content start */}

      <ScrollView style={{flex: 1}}>
        <View className="p-2">
          <Text className="text-xl font-bold">Favorite List</Text>
        </View>
        {!loading && data.length > 0 ? (
          <View className="flex flex-row flex-wrap m-2 overflow-scroll">
            {data?.map(data => {
              return <ListAnime data={data} navigation={navigation} />;
            })}
          </View>
        ) : data.length < 1 ? (
          <View className="flex justify-center items-center">
            <Text className="text-2xl">Data Kosong</Text>
          </View>
        ) : (
          <View className="flex">
            <Image source={LoadingAnimation} className="w-20 h-20 mx-auto " />
          </View>
        )}
      </ScrollView>
      {/* list content end */}
      <Footer navigation={navigation} data="AnimeFavorite" />
    </View>
  );
};

export default AnimeFavorite;

const styles = StyleSheet.create({});
