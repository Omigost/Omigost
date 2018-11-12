import React from 'react'
import './SectionAbout.css'
import withContent from '../../utils/withContent.js'


import Section from 'components/Section/Section.jsx'
import CustomIcon from 'components/CustomIcon/CustomIcon.jsx'

class SectionAbout extends React.Component {
  render() {
    return (
      <div styleName='SectionAbout'>
        <Section
          withoutMargin
          id='about'
          title='About the conference'
        >
          <p styleName='AboutText'>
              {this.props.content.about}
          </p>
        </Section>
      </div>
    )
  }
}

export default withContent(SectionAbout)