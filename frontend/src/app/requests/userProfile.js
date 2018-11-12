import axios from 'axios'

export default function userProfile(options, okCallback, errCallback) {
  const { id } = options;

  axios({
      method: 'get',
      url: $API_BASE + '/api/users/profile',
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
