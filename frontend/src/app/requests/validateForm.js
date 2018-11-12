import axios from 'axios'

export default function validateForm(options, okCallback, errCallback) {
  const { name } = options;

  axios({
      method: 'get',
      url: $API_BASE + '/api/forms/' + name + '/validate',
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