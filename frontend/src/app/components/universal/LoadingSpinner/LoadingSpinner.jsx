import React from 'react'
import './LoadingSpinner.css'

import ReactLoading from 'react-loading'

class LoadingSpinner extends React.Component {

    render() {
        return (
            <div styleName='LoadingSpinner'>
                <ReactLoading
                  type={'spin'}
                  color={'#ff3d1f'}
                  height={100}
                  width={100}
                />
            </div>
        );
    }
}

export default LoadingSpinner
