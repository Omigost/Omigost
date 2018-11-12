import axios from 'axios'

export default function getDoc(options, okCallback, errCallback) {
  const { name } = options;

  axios({
      method: 'get',
      url: $API_BASE + '/api/docs/' + name,
      config: {
          withCredentials: true
      }
  }).then(function (response) {
    const data = response.data || {};
    if(data.error) {
      errCallback(data.error);
    } else {
      okCallback(data || {});
    }
  }).catch(function (error) {
    errCallback(error);
  });

};
