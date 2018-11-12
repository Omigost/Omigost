import React from 'react'
import './SectionLeft.css'

class SectionLeft extends React.Component {
  render() {
   
    const { children, withoutMargin } = this.props;
   
    return (
      <div 
        styleName={
          (withoutMargin)?('SectionLeftNoMargin'):('SectionLeft')
        }
      >
        {children}
      </div>
    )
  }
}

export default SectionLeft