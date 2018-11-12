import React from 'react';
import Lottie from 'lottie-react-web';
const carAnimation = require('./car.json');

export default class AnimationLoader extends React.Component {

  render() {
    
    const { loop } = this.props;
    
    return (
        <Lottie
          options={{
            animationData: carAnimation,
            loop: loop || false,
            autoPlay: true
          }}
        />
    );
  }

};
