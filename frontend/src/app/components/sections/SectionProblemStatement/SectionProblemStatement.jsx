import React from 'react'
import './SectionProblemStatement.css'

import Section from 'components/Section/Section.jsx'
import GeneralStatsView from 'components/GeneralStatsView/GeneralStatsView.jsx'

class SectionProblemStatement extends React.Component {
  render() {
    return (
      <div styleName='SectionProblemStatement'>
        <Section
          id='understand'
          title='What is the problem'
          rightContent={
              <div>
                <div styleName='Title'>
                    The key to cost optimization is the understanding
                </div>
                <div styleName='Description'>
                    These days big cloud clusters management can be tough task. With our help you will understand your resources utilization and manage
                    them in a friendlier more familiar way. Don't wait give us a chance just now!
                </div>
              </div>
          }
        > 
           <GeneralStatsView />
        </Section>
      </div>
    )
  }
}

export default SectionProblemStatement