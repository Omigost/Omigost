import 'bootstrap/dist/css/bootstrap.css'
import './App.less'
import './Theme.less'

import 'react-tippy/dist/tippy.css'
//import 'react-vertical-timeline-component/style.min.css?raw'

import * as log from 'loglevel'

export default {
  load: () => {
    log.info('Loader loaded :)')
  }
}