
import axios from 'axios'

export default function availableForms(options, okCallback, errCallback) {

  axios({
      method: 'get',
      url: $API_BASE + '/api/forms',
      config: {
          withCredentials: true
      }
  }).then(function (response) {
    const data = response.data || {};
    if(data.error) {
      errCallback(data.error);
    } else {
      try {
        okCallback(data);
      } catch(error) {
        errCallback(error);
      }
    }
  }).catch(function (error) {
    errCallback(error);
  });

};
