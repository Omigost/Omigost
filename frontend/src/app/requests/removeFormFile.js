import axios from 'axios'

export default function removeFormFile(options, okCallback, errCallback) {
  const { name, field } = options;

  axios({
      method: 'post',
      url: $API_BASE + '/api/forms/' + name + '/remove/' + field,
      withCredentials: true,
      validateStatus: () => true,
  }).then(function (response) {
      const data = response.data || {};
      console.log(response);
      console.log(JSON.stringify(response.data, null, 2));

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
