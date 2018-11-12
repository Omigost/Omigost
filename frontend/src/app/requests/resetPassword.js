import axios from 'axios'

export default function resetPassword(options, okCallback, errCallback) {
  const { email, passwd, passwdConfirm } = options;

    const formData = new FormData();
    formData.set('email', email);
    formData.set('password', passwd);
    formData.set('password-confirm', passwdConfirm);
    formData.set('_token', document.head.querySelector("[name~=csrf-token][content]").content);
    formData.set('reset-token', document.head.querySelector("[name~=reset-token][content]").content);

    axios({
      method: 'post',
      url: $API_BASE + '/api/password/change',
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
