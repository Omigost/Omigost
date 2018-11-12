import React from 'react'
import './Content.css'


class Content extends React.Component {
  render() {
    const { children } = this.props;
    
    return (
      <div styleName='Content'>
        {children}
      </div>
    )
  }
}

export default Content