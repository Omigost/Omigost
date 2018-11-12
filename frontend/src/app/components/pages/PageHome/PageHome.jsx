import React from 'react'

import Page from 'components/Page/Page.jsx'

import SectionAbout from 'sections/SectionAbout/SectionAbout.jsx'
import SectionProblemStatement from 'sections/SectionProblemStatement/SectionProblemStatement.jsx'

class PageHome extends React.Component {
  render() {
    return (
      <Page>
        <SectionProblemStatement />
        <SectionAbout />
      </Page>
    )
  }
}

export default PageHome
