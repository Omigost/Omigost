import axios from 'axios'

export default function login(options, okCallback, errCallback) {
  const { login, passwd } = options;

    const formData = new FormData();
    formData.set('email', login);
    formData.set('password', passwd);
    formData.set('remember', false);
    formData.set('_token', document.head.querySelector("[name~=csrf-token][content]").content);

    axios({
      method: 'post',
      url: $API_BASE + '/login',
      data: formData,
      validateStatus: () => true,
      config: {
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
