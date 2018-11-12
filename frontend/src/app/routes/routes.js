import React from 'react'

import { Router, IndexRoute, Route, browserHistory } from 'react-router'

import PageHome from 'pages/PageHome/PageHome.jsx'

const routes = [
  <Route
    key='route-index'
    path={$ROUTER_BASE + '/home'}
    component={PageHome}
  />,
  <Route
    key='route-index-default'
    path={$ROUTER_BASE + '/'}
    component={PageHome}
  />
];


export default routes
