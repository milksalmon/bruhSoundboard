import React, { useState, useEffect } from 'react';
import {Text, View, TouchableWithoutFeedback, Image } from "react-native";
import {Audio} from 'expo-av';



export default function Index() {
  const [bruhSound, setBruhSound] = useState<Audio.Sound | undefined>(undefined);
  const [LMKSound, setLMKSound] = useState<Audio.Sound | undefined>(undefined);
  const [bruhImage, setBruhImage] = useState(require('../assets/images/Button.png'));
  const [pressCount, setPressCount] = useState(0);

  //(--- Sound manager
  async function playBruhSound() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/bruh_sound_effect.mp3'));
    setBruhSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return bruhSound
      ? () => {
          console.log('Unloading Sound');
          bruhSound.unloadAsync();
        }
      : undefined;
  }, [bruhSound]);

  async function playLMK() {
    const { sound } = await Audio.Sound.createAsync( require('../assets/sounds/let_me_know.mp3'));
    setLMKSound(sound);

    await sound.playAsync();
  }

  useEffect(() => {
    return LMKSound
      ? () => {
          console.log('Unloading Sound');
          LMKSound.unloadAsync();
        }
      : undefined;
  }, [LMKSound]);
  //---)

  

  function Pressed () {
    setBruhImage(require('../assets/images/Button_Pressed.png'))
  }

  function pressRelease () {
    setBruhImage(require('../assets/images/Button.png'));
    setPressCount(prev => {
      console.log("This guy reached " + prev);
      if (prev % 50 === 0) {
        playLMK();
      } else {
        playBruhSound();
      }
      return prev + 1});
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
