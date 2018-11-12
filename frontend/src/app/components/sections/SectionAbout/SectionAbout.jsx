import React from 'react'
import './SectionAbout.css'
import withContent from '../../../utils/withContent.js'

import Section from 'components/Section/Section.jsx'
import { Card, Rate, Avatar } from 'antd'

import MD from 'components/MD/MD.jsx';
import aboutText from 'content/about.md';

class SectionAbout extends React.Component {
  render() {
    return (
      <div styleName='SectionAbout'>
        <Section
          inverted
          withoutMargin
          id='about'
          title='Our solution for cloud financial doubts'
        >
          <p data-aos="fade-left" styleName='AboutText'>
              <MD>{aboutText}</MD>
          </p>
          <table styleName='ExamplesTable'>
            <tbody>
              <tr>
                <td>
                  <div>
                    <img styleName='Screenshot' src='/img/optimization_screenshot.png' />
                  </div>
                  <div>
                    <div styleName='Quotes'>
                      <p>
                        Our tools can help you find unused resources and better allocate them!
                      </p>
                      <p>
                        The Omigost saves lives inside the small and medium industry.
                      </p>
                    </div>  
                  </div>
                </td>
                <td>
                    <Rate disabled defaultValue={5} />
                    <p>
                        Flexibility
                    </p>
                </td>
                <td>
                    <Rate disabled defaultValue={4} />
                    <p>
                        Optimalization
                    </p>
                </td>
              </tr>
            </tbody>
          </table>
        </Section>
      </div>
    )
  }
}

export default withContent(SectionAbout)
