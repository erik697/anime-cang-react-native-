import {Alert, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useState} from 'react';

import YoutubePlayer from 'react-native-youtube-iframe';

const VideoYoutube = ({data}: {data: string}) => {
  const [playing, setPlaying] = useState(false);

  const onStateChange = useCallback(state => {
    if (state === 'ended') {
      setPlaying(false);
      Alert.alert('video has finished playing!');
    }
  }, []);

  const togglePlaying = useCallback(() => {
    setPlaying(prev => !prev);
  }, []);
  return (
    <View>
      <YoutubePlayer
        height={300}
        play={playing}
        videoId={data}
        onChangeState={onStateChange}
      />
      {/* <Button
                title={playing ? 'pause' : 'play'}
                onPress={togglePlaying}
              /> */}
    </View>
  );
};

export default VideoYoutube;

const styles = StyleSheet.create({});
