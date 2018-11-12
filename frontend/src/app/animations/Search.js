import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { DangerZone } from 'expo';
const { Lottie } = DangerZone;
const searchAnimation = require('./search.json');

export default class AnimationSearch extends React.Component {

  render() {
    
    /*if(this.animation) {
      this.animation.reset();
      this.animation.play();
    }*/
    
    return (
      <View style={styles.animationContainer}>
        <Lottie
          ref={animation => {
            this.animation = animation;
            if(animation) {
              animation.reset();
              animation.play();
            }
          }}
          style={{
            width: 400,
            height: 400,
            backgroundColor: 'rgba(255,255,255,0)',
          }}
          source={searchAnimation}
          loop
          autoPlay
          autoplay
        />
      </View>
    );
  }

};


const styles = StyleSheet.create({
  animationContainer: {
    backgroundColor: 'rgba(255,255,255,0)',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  buttonContainer: {
    
  },
});