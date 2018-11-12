import React from 'react'
import './Loading.css'

import CarAnimation from 'animations/Car.js'

class Loading extends React.Component {

    render() {
        return (
            <div styleName='Loading'>
                <CarAnimation loop />
            </div>
        );
    }
}

export default Loading