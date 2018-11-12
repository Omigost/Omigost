import axios from 'axios'

export default function requestPasswordReset(options, okCallback, errCallback) {
  const { email, passwd, passwdConfirm } = options;

    const formData = new FormData();
    if(email) {
        formData.set('email', email);
    }

    axios({
      method: 'post',
      url: $API_BASE + '/api/password/reset',
      validateStatus: () => true,
      data: formData,
      config: {
        validateStatus: () => true,
        withCredentials: true,
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
  }).then(function (response) {
      const data = response.data || {};
      if (response.status != 200 || (data && data.errors)) {
          const errors = data.errors || {};
          let errorText = null;
          Object.keys(errors).forEach(key => {
              if(!errorText && errors[key] && errors[key][0]) {
                  errorText = errors[key][0];
              }
          });
          errorText = errorText || response.statusText || null;
          errCallback(errorText);
      } else {
          okCallback(data);
      }
  }).catch(function (error) {
    errCallback(error);
  });

};
