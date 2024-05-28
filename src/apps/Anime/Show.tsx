import {
  Alert,
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useCallback, useEffect, useState} from 'react';
import Header from '../../components/Header';
import axios from 'axios';
import VideoYoutube from '../../components/VideoYoutube';
import {openDatabase} from 'react-native-sqlite-storage';
import {SvgUri} from 'react-native-svg';
import {Favorite, FavoriteO, Loading} from '../../assets/svg';
// import {Loading} from '../../assets/svg/Loading.svg';

var db = openDatabase(
  {name: 'anime_cang.db', createFromLocation: 1},
  () => {
    // Alert.alert('Info', 'Sukses loading database SQLite');
  },
  err => {
    console.log(err);
    alert(JSON.stringify(err));
  },
);

const Show = ({navigation, route}) => {
  const [data, setData] = useState({});

  const [favorite, setFavorite] = useState(false);

  const getData = () => {
    axios
      .get('https://api.jikan.moe/v4/anime/' + route.params.id)
      .then(function (response) {
        // console.log('ini data : ', response.data.data.genres.length);
        setData(response.data.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getData();
    getDetail();
  }, []);

  const getDetail = () => {
    db.transaction(tx => {
      tx.executeSql(
        "SELECT * FROM collection WHERE anime_mal_id = '" +
          route.params.id +
          "'",
        [],
        (tx, results) => {
          console.log('Query completed');

          // Get rows with Web SQL Database spec compliance.

          var len = results.rows.length;
          if (len > 0) {
            setFavorite(true);
          }
        },
      );
    });
  };

  const addToFavorite = (anime_mal_id, anime_image, anime_title) => {
    if (!favorite) {
      db.transaction(tx => {
        tx.executeSql(
          "INSERT INTO collection (user_email,anime_mal_id,anime_image,anime_title) VALUES ('User','" +
            anime_mal_id +
            "', '" +
            anime_image +
            "', '" +
            anime_title +
            "');",
          [],
          (txn, res) => {
            // let newListData = listData;
            // newListData.push(value);

            // setListData(newListData);
            // setValue('');
            setFavorite(true);
            Alert.alert(
              'Ditambahkan',
              'Anime berhasil ditambahkan ke list favorite',
            );
          },
        );
      });
    } else {
      db.transaction(tx => {
        tx.executeSql(
          "DELETE from collection WHERE anime_mal_id = '" + anime_mal_id + "';",
          [],
          (txn, res) => {
            // let newListData = listData;
            // newListData.push(value);

            // setListData(newListData);
            // setValue('');
            setFavorite(false);
            Alert.alert('Dihapus', 'Anime berhasil dihapus dari list favorite');
          },
        );
      });
    }
  };

  return (
    <View style={{flex: 1}}>
      <Header data={data.title} />

      <ScrollView>
        <View className="w-full bg-white ">
          <View className="mx-1 flex flex-row">
            <Image
              src={data.images?.jpg.image_url}
              className=" w-1/2 mb-10 h-72 bg-slate-500"
            />

            <View className="w-1/2 flex">
              <View className="m-2 ">
                <View className="ml-auto">
                  <TouchableOpacity
                    onPress={() => {
                      addToFavorite(
                        data.mal_id,
                        data.images?.jpg.image_url,
                        data.title,
                      );
                    }}>
                    {favorite ? (
                      <Favorite width="30" height="30" />
                    ) : (
                      <FavoriteO width="30" height="30" color="red" />
                    )}
                    {/* */}
                  </TouchableOpacity>
                </View>
                <Text>Year : {data.year}</Text>
                <Text>Episode : {data.episodes}</Text>
                <Text>Rating : {data.rating}</Text>
                <Text>Score : {data.score}</Text>
                <TouchableOpacity
                  onPress={() => {
                    addToFavorite(
                      data.mal_id,
                      data.images?.jpg.image_url,
                      data.title,
                    );
                  }}>
                  <Text>{favorite ? 'hapus Favorite' : 'tambah favorite'}</Text>
                </TouchableOpacity>
                <Text>
                  Genres :
                  {data.genres?.map((dat, index) => {
                    return (
                      <Text>
                        {dat.name}
                        {data.genres.length > index + 1 ? ', ' : ''}
                      </Text>
                    );
                  })}
                </Text>
              </View>
            </View>
          </View>
          <View className="mx-6">
            <Text className="mt-2 mb-1">Sinopsis :</Text>
            <Text className="text-justify mb-4">{data.synopsis}</Text>

            <Text className="mt-2 mb-1 ">Trailer :</Text>
            <VideoYoutube data={data.trailer?.youtube_id} />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Show;

const styles = StyleSheet.create({});
