import * as actions from './actions'

const appInitialState = {
  lang: 'en',
  content: {
      loaded: false
  },
  contentUpdateTimestamp: +new Date()
};

function app(state = appInitialState, action) {
  console.log('app REDUCE ACTION '+action.type);
  switch (action.type) {
    case actions.CHANGE_LANG: {
       return Object.assign({}, state, {
         lang: action.lang || state.lang || 'en'
       });
    }
    case actions.REQUEST_CONTENT: {
       return state;
    }
    case actions.FETCHED_CONTENT: {
      const newContent = Object.assign({}, state.content, action.content);
      const newState = Object.assign({}, state, {
        content: newContent,
        contentUpdateTimestamp: +new Date()
      });
      return newState;
    }
    default:
      return state
  }
};


export default {
  app: app
}