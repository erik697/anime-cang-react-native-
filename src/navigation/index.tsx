import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Anime from '../apps/Anime';
import Show from '../apps/Anime/Show';
import Filter from '../apps/Anime/Filter';
import AnimeFavorite from '../apps/Anime/AnimeFavorite';

const Nav = () => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator>
      <Stack.Group screenOptions={{headerShown: false}}>
        <Stack.Screen name="Anime" component={Anime} />
        <Stack.Screen name="AnimeDetail" component={Show} />
        <Stack.Screen name="AnimeFavorite" component={AnimeFavorite} />
        <Stack.Screen name="AnimeFilter" component={Filter} />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default Nav;
