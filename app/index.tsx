import React, { useState, useEffect } from 'react';
import {Text, View, TouchableWithoutFeedback, Image } from "react-native";
import {Audio} from 'expo-av';



export default function Index() {
  const [sound, setSound] = useState<Audio.Sound | undefined>(undefined);
  const [bruhImage, setBruhImage] = useState(require('../assets/images/Button.png'));

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/bruh_sound_effect.mp3'));
    setSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);



  function Pressed () {
    setBruhImage(require('../assets/images/Button_Pressed.png'))
  

  }

  function pressRelease () {
    playSound();
    setBruhImage(require('../assets/images/Button.png'));

  }


  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <TouchableWithoutFeedback onPressIn={Pressed} onPressOut={pressRelease}><Image source={bruhImage} style={{height: 143, width: 170}}/></TouchableWithoutFeedback>
    </View>
  );
}
