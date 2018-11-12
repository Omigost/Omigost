import axios from 'axios'

export default function submitForm(options, okCallback, errCallback) {
  const { name } = options;

  axios({
      method: 'post',
      url: $API_BASE + '/api/forms/' + name + '/submit',
      withCredentials: true,
      validateStatus: () => true,
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
