import React from 'react';
import Lottie from 'lottie-react-web';
const radarAnimation = require('./radar.json');

export default class AnimationRadar extends React.Component {

  render() {
    
    const { loop } = this.props;
    
    return (
        <Lottie
          options={{
            animationData: radarAnimation,
            loop: loop || false,
            autoPlay: true
          }}
        />
    );
  }

};