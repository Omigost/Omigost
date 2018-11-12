import axios from 'axios'

export default function verifyEmail(options, okCallback, errCallback) {
  const { selector, token } = options;
  
  axios.post($API_BASE + '/api/verify_account.php', {
    selector,
    token
  }).then(function (response) {
    const data = response.data || {};
    if(data.error) {
      errCallback(data.error);
    } else {
      okCallback(data);
    }
  }).catch(function (error) {
    errCallback(error);
  });
  
};