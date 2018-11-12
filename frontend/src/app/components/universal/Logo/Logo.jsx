import React from 'react'
import './Logo.css'

class Logo extends React.Component {
  render() {
    const { small } = this.props;
    return (
      <div
        styleName={
          (small)?('LogoSmall'):('Logo')
        }
      >
        <img
          styleName='LogoImage'
          src={
            (small)?('/img/omigostLogo.png'):('/img/omigostLogo.png')
          }
        />
      </div>
    )
  }
}

export default Logo