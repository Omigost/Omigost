import axios from 'axios'

window.axios = axios;

export default function register(options, okCallback, errCallback) {
  const { login, passwd, passwdRep, email } = options;

  const formData = new FormData();
  formData.set('name', login);
  formData.set('email', email);
  formData.set('password', passwd);
  formData.set('password_confirmation', passwdRep);
  formData.set('_token', document.head.querySelector("[name~=csrf-token][content]").content);

  axios({
      method: 'post',
      url: $API_BASE + '/register',
      data: formData,
      validateStatus: () => true,
      config: {
          withCredentials: true,
          headers: {
              'Content-Type': 'multipart/form-data'
          }
      }
  }).then(function (response) {
      console.log(response);
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
