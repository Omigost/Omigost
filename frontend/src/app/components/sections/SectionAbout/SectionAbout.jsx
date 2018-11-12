import React from 'react'
import './SectionAbout.css'
import withContent from '../../../utils/withContent.js'

import Section from 'components/Section/Section.jsx'
import { Card, Rate, Avatar } from 'antd'

import Quote from 'grommet/components/Quote'
import Paragraph from 'grommet/components/Paragraph'
import Meter from 'grommet/components/Meter';
import Box from 'grommet/components/Box';
import Value from 'grommet/components/Value';

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
                    <Quote
                      borderColorIndex='transparent'
                      credit='Short description'
                      size='medium'
                    >
                      <Paragraph>
                        Our tools can help you find unused resources and better allocate them!
                      </Paragraph>
                      <Paragraph>
                        The Omigost saves lives inside the small and medium industry.
                      </Paragraph>
                    </Quote>  
                  </div>
                </td>
                <td>
                    <Box responsive={false} align='center'>
                      <Meter
                        vertical={false}
                        type='arc'
                        colorIndex='light-1'
                        value={0.1 * 100}
                      />
                      <Value
                          value={0.9}
                          units={'/ 1.0'}
                          colorIndex='light-1'
                          size='medium'
                          units=' Flexibility'
                        />
                    </Box>
                </td>
                <td>
                    <Box responsive={false} align='center'>
                      <Meter
                        vertical={false}
                        type='arc'
                        colorIndex='light-1'
                        value={0.9 * 100}
                      />
                      <Value
                          value={0.4}
                          units={'/ 1.0'}
                          size='medium'
                          colorIndex='light-1'
                          units=' Optimization'
                        />
                    </Box>
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
