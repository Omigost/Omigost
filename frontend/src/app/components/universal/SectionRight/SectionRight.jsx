import React from 'react'
import './SectionRight.css'

class SectionRight extends React.Component {
  render() {
   
    const { children } = this.props;
   
    return (
      <div styleName='SectionRight'>
        {children}
      </div>
    )
  }
}

export default SectionRight