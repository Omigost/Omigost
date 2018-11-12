
export const CHANGE_LANG = 'CHANGE_LANG'
export function changeLang(lang) {
    console.log('changeLang ACTION');
    return { type: CHANGE_LANG, lang }
}

export const FETCHED_CONTENT = 'FETCHED_CONTENT'
export function fetchedContent(content) {
  console.log('fetchedContent ACTION');
  return { type: FETCHED_CONTENT, content }
}

export const REQUEST_CONTENT = 'REQUEST_CONTENT'
export function requestContent(dispatch, lang, contentUpdateTimestamp) {
    return;
    
  //return { type: REQUEST_CONTENT };
    if((+new Date()) - contentUpdateTimestamp <= 100000) {
      return;
    }

    console.warn("Start fetch content last timestamp = "+contentUpdateTimestamp+" and now = "+(+new Date()));
    
    dispatch({ type: REQUEST_CONTENT });
    dispatch(fetchedContent({
        fetch_error: false,
        loaded: false
    }));

    const request = new Request(
        $API_BASE + `/api/content/fetch/${lang}`,
        {
            method: 'GET'
        }
    );

    fetch(request)
    .then(resp => {
        resp.json().then(data => {
            dispatch(fetchedContent(Object.assign({}, data, {
                fetch_error: false,
                loaded: true
            })));
        });
    })
    .catch(err => {
        dispatch(fetchedContent({
            fetch_error: true,
            loaded: true
        }));
    });
}